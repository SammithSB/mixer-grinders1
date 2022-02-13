import fasttext 

def classify(text):
    ft_model = fasttext.load_model('hate_speech_model1.bin')
    return "no" if ft_model.predict(text)[0][0] == '__label__no' else "hate speech"
