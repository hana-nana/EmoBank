from airflow import DAG
# from airflow.operators.docker_operator import PythonOperator
from datetime import datetime, timedelta
from airflow.operators.python import PythonOperator
# from docker.types import Mount 
import os
import extract_data
from warnings import filterwarnings
# filterwarnings(action='ignore', category=DeprecationWarning, message='`np.bool` is a deprecated alias')

default_args = {
    'owner'                 : 'Emobank',
    'description'           : 'train_AI',
    'depend_on_past'        : False,
    'start_date'            : datetime(2024, 3, 30),
    'end_date'              : datetime(2024, 4, 6)
}

with DAG('train', 
         default_args=default_args, 
         schedule_interval= timedelta(minutes=120),
         catchup=True) as dag:
    ai_task = PythonOperator(
        task_id='train_AI',
        python_callable=extract_data.extract_data,
    )

    ai_task


