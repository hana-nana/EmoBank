# AWS에 있는 데이터를 가져와서 /data폴더에다가 csv로 저장

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
import pandas as pd
import time
from multiprocessing import connection

import ai as ai

# .env 파일 로드
load_dotenv()

# 환경 변수 읽어오기
MYSQL_HOST_NAME = os.getenv('MYSQL_HOST_NAME')
MYSQL_USER_NAME = os.getenv('MYSQL_USER_NAME')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')

def extract_data():
    db_connection = create_engine(f'mysql+pymysql://{MYSQL_USER_NAME}:{MYSQL_PASSWORD}@{MYSQL_HOST_NAME}/{MYSQL_DB}')
    # conn = connection.connect(host=MYSQL_HOST_NAME, user=MYSQL_USER_NAME, db=MYSQL_DB, password=MYSQL_PASSWORD) # python에서 mysql 연결하는 코드
    sql = "select memo AS memo, emotionPk AS emoji from EmotionAccount where memo IS NOT NULL AND memo != '';"
    df = pd.read_sql(sql, db_connection)
    print("extract_data", df)

    # df.to_csv(f'./Data.csv', encoding='cp949')
    # df.to_csv(f'/home/zerocarjam/airflow/data.csv', encoding='cp949')
    df.to_csv(f'/home/ubuntu/airflow/data.csv', encoding='cp949')

    ai.train()

extract_data()