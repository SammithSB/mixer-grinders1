from flask import Flask, request
from fastTextModel import classify

app = Flask('app')
@app.route('/test', methods=['GET'])
def test():
    return 'Pinging Model Application!!'

@app.route('/predict', methods=['POST'])
def predict():
    sentence = request.json['text']
    res = classify(sentence)
    print(res)
    return res