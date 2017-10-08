FROM python:3.4-alpine
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
ENV FLASK_APP=app.py
CMD ["python", "app.py"]
