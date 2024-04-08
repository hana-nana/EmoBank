import torch
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel
import sys

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')

import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm.notebook import tqdm
import pandas as pd

#transformers
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup
from transformers import BertModel
from datetime import datetime

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# device = torch.device('cpu')

def get_kobert_model(model_path, vocab_file, ctx="cpu"):
    bertmodel = BertModel.from_pretrained(model_path)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    # device = torch.device('cpu')
    bertmodel.to(device)
    bertmodel.eval()
    vocab_b_obj = nlp.vocab.BERTVocab.from_sentencepiece(vocab_file,
                                                         padding_token='[PAD]')
    return bertmodel, vocab_b_obj

bertmodel, vocab=get_kobert_model('skt/kobert-base-v1',tokenizer.vocab_file)

# GCP ver
# data = pd.read_csv('/home/zerocarjam/airflow/data.csv', encoding='cp949')

# EC2 ver
data = pd.read_csv('/home/ubuntu/airflow/data.csv', encoding='cp949')

# data = pd.read_csv('./Data.csv', encoding='cp949')
print("ai", data)

# data.loc[(data['1번 감정'] == "fear"), '1번 감정'] = 0  #공포 => 0
# data.loc[(data['1번 감정'] == "surprise"), '1번 감정'] = 1  #놀람 => 1
# data.loc[(data['1번 감정'] == "angry"), '1번 감정'] = 2  #분노 => 2
# data.loc[(data['1번 감정'] == "sadness"), '1번 감정'] = 3  #슬픔 => 3
# data.loc[(data['1번 감정'] == "neutral"), '1번 감정'] = 4  #중립 => 4
# data.loc[(data['1번 감정'] == "happiness"), '1번 감정'] = 5  #행복 => 5
# data.loc[(data['1번 감정'] == "disgust"), '1번 감정'] = 6  #혐오 => 6

data_list = []
for ques, label in zip(data['memo'], data['emoji'])  :
    data = []
    data.append(ques)
    data.append(int(label))

    data_list.append(data)

class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer,vocab, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len,vocab=vocab, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))


    def __len__(self):
        return (len(self.labels))

# Setting parameters
max_len = 64
batch_size = 64
warmup_ratio = 0.1
num_epochs = 20
max_grad_norm = 1
log_interval = 200
learning_rate =  5e-5

#train & test 데이터로 나누기
from sklearn.model_selection import train_test_split

dataset_train, dataset_test = train_test_split(data_list, test_size=0.2, shuffle=True, random_state=34)

import numpy as np
#print(f"Train labels: {dataset_train[tok]}")
#print(f"Test labels: {dataset_test[tok]}")
tok=tokenizer.tokenize
data_train = BERTDataset(dataset_train, 0, 1, tok, vocab, max_len, True, False)
data_test = BERTDataset(dataset_test,0, 1, tok, vocab,  max_len, True, False)

train_dataloader = torch.utils.data.DataLoader(data_train, batch_size=batch_size, num_workers=1)
test_dataloader = torch.utils.data.DataLoader(data_test, batch_size=batch_size, num_workers=1)

class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=7,   ##클래스 수 조정##
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device),return_dict=False)
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)

#BERT 모델 불러오기
model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)

# GCP ver
# model.load_state_dict(torch.load("/home/zerocarjam/airflow/model_epoch_21.pth",map_location=device))

# EC2 ver
model.load_state_dict(torch.load("/home/ubuntu/airflow/model_epoch_21.pth",map_location=device))

# model.load_state_dict(torch.load("./dags/model_epoch_21.pth",map_location=device))

# model.load_state_dict(torch.load("./model_epoch_21.pth",map_location=device))


#optimizer와 schedule 설정
no_decay = ['bias', 'LayerNorm.weight']
optimizer_grouped_parameters = [
    {'params': [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)], 'weight_decay': 0.01},
    {'params': [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)], 'weight_decay': 0.0}
]

optimizer = AdamW(optimizer_grouped_parameters, lr=learning_rate)
loss_fn = nn.CrossEntropyLoss() # 다중분류를 위한 대표적인 loss func

t_total = len(train_dataloader) * num_epochs
warmup_step = int(t_total * warmup_ratio)

scheduler = get_cosine_schedule_with_warmup(optimizer, num_warmup_steps=warmup_step, num_training_steps=t_total)

#정확도 측정을 위한 함수 정의
def calc_accuracy(X,Y):
    max_vals, max_indices = torch.max(X, 1)
    train_acc = (max_indices == Y).sum().data.cpu().numpy()/max_indices.size()[0]
    return train_acc

def train():
    # f = open('train_acc_result.txt', 'a')
    # print(datetime.today().strftime("%Y/%m/%d %H:%M:%S"), file=f)
    # f.close()

    train_history = []
    test_history = []
    loss_history = []
    for e in range(num_epochs):
        train_acc = 0.0
        test_acc = 0.0
        model.train()
        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(tqdm(train_dataloader)):
            optimizer.zero_grad()
            token_ids = token_ids.long().to(device)
            segment_ids = segment_ids.long().to(device)
            valid_length= valid_length
            label = label.long().to(device)
            out = model(token_ids, valid_length, segment_ids)

            #print(label.shape,out.shape)
            loss = loss_fn(out, label)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)
            optimizer.step()
            scheduler.step()  # Update learning rate schedule
            train_acc += calc_accuracy(out, label)
            if batch_id % log_interval == 0:
                print("epoch {} batch id {} loss {} train acc {}".format(e+1, batch_id+1, loss.data.cpu().numpy(), train_acc / (batch_id+1)))
                train_history.append(train_acc / (batch_id+1))
                loss_history.append(loss.data.cpu().numpy())
        print("epoch {} train acc {}".format(e+1, train_acc / (batch_id+1)))
        #train_history.append(train_acc / (batch_id+1))

        if e + 1 == num_epochs:
            torch.save(model.state_dict(), f'model_epoch_{e + 1}.pth')

        model.eval()
        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(tqdm(test_dataloader)):
            token_ids = token_ids.long().to(device)
            segment_ids = segment_ids.long().to(device)
            valid_length= valid_length
            label = label.long().to(device)
            out = model(token_ids, valid_length, segment_ids)
            test_acc += calc_accuracy(out, label)
        # print("epoch {} test acc {}".format(e+1, test_acc / (batch_id+1)))
        # test_history.append(test_acc / (batch_id+1))
        f = open('train_acc_result.txt', 'w')
        print("epoch {} test acc {}".format(e + 1, test_acc / (batch_id + 1)), file=f)
        print("들어옴")
        f.close()


# def predict(predict_sentence):
#     data = [predict_sentence, '0']
#     dataset_another = [data]

#     another_test = BERTDataset(dataset_another, 0, 1, tok, vocab, max_len, True, False)
#     test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

#     model.eval()

#     for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
#         token_ids = token_ids.long().to(device)
#         segment_ids = segment_ids.long().to(device)

#         valid_length = valid_length
#         label = label.long().to(device)

#         out = model(token_ids, valid_length, segment_ids)

#         print(out)

#         test_eval = []
#         for i in out:
#             logits = i
#             logits = logits.detach().cpu().numpy()

#             if np.argmax(logits) == 0:
#                 test_eval.append("공포가")
#             elif np.argmax(logits) == 1:
#                 test_eval.append("놀람이")
#             elif np.argmax(logits) == 2:
#                 test_eval.append("분노가")
#             elif np.argmax(logits) == 3:
#                 test_eval.append("슬픔이")
#             elif np.argmax(logits) == 4:
#                 test_eval.append("중립이")
#             elif np.argmax(logits) == 5:
#                 test_eval.append("행복이")
#             elif np.argmax(logits) == 6:
#                 test_eval.append("혐오가")

#         for i in test_eval:
#             print("test_eval = " + i)
#         print(">> 입력하신 내용에서 " + test_eval[0] + " 느껴집니다.")

# if __name__ == "__main__":
#     train()
    # end = 1
    # while end == 1:
    #     sentence = input("하고싶은 말을 입력해주세요 : ")
    #     if sentence == "0":
    #         break
    #     predict(sentence)
    #     print("\n")