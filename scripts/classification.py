from sklearn import model_selection, preprocessing, linear_model, naive_bayes, metrics, svm
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn import decomposition, ensemble

import pandas, xgboost, numpy, textblob, string
from keras.preprocessing import text, sequence
from keras import layers, models, optimizers


# load the dataset
data = open('scripts/input/lookup-table.csv').read()
labels, texts = [], []
for i, line in enumerate(data.split("\n")):
    content = line.split(";")
    labels.append(content[2])
    texts.append(content[1])

# create a dataframe using texts and lables
trainDF = pandas.DataFrame()
trainDF['text'] = texts
trainDF['label'] = labels

# split the dataset into training and validation datasets 
train_x, valid_x, train_y, valid_y = model_selection.train_test_split(trainDF['text'], trainDF['label'])

# # label encode the target variable 
# encoder = preprocessing.LabelEncoder()
# train_y = encoder.fit_transform(train_y)
# valid_y = encoder.fit_transform(valid_y)

# create a count vectorizer object 
count_vect = CountVectorizer(analyzer='word', token_pattern=r'\w{1,}')
count_vect.fit(trainDF['text'])

# transform the training and validation data using count vectorizer object
xtrain_count =  count_vect.transform(train_x)
xvalid_count =  count_vect.transform(valid_x)

# word level tf-idf
tfidf_vect = TfidfVectorizer(analyzer='word', token_pattern=r'\w{1,}', max_features=5000)
tfidf_vect.fit(trainDF['text'])
xtrain_tfidf =  tfidf_vect.transform(train_x)
xvalid_tfidf =  tfidf_vect.transform(valid_x)

# ngram level tf-idf 
tfidf_vect_ngram = TfidfVectorizer(analyzer='word', token_pattern=r'\w{1,}', ngram_range=(2,3), max_features=5000)
tfidf_vect_ngram.fit(trainDF['text'])
xtrain_tfidf_ngram =  tfidf_vect_ngram.transform(train_x)
xvalid_tfidf_ngram =  tfidf_vect_ngram.transform(valid_x)

# characters level tf-idf
tfidf_vect_ngram_chars = TfidfVectorizer(analyzer='char', token_pattern=r'\w{1,}', ngram_range=(2,3), max_features=5000)
tfidf_vect_ngram_chars.fit(trainDF['text'])
xtrain_tfidf_ngram_chars =  tfidf_vect_ngram_chars.transform(train_x) 
xvalid_tfidf_ngram_chars =  tfidf_vect_ngram_chars.transform(valid_x) 

def train_model(classifier, feature_vector_train, label, feature_vector_valid, is_neural_net=False):
    # fit the training dataset on the classifier
    classifier.fit(feature_vector_train, label)
    
    # predict the labels on validation dataset
    predictions = classifier.predict(feature_vector_valid)

    for i in range(50):
	    print("X=%s, Predicted=%s" % (list(valid_x)[i], predictions[i]))
    
    if is_neural_net:
        predictions = predictions.argmax(axis=-1)

    print("#########################################################################################")
    
    return metrics.accuracy_score(predictions, valid_y)

# # Naive Bayes on Count Vectors
# accuracy = train_model(naive_bayes.MultinomialNB(), xtrain_count, train_y, xvalid_count)
# print("NB, Count Vectors: ", accuracy)

# # Naive Bayes on Word Level TF IDF Vectors
# accuracy = train_model(naive_bayes.MultinomialNB(), xtrain_tfidf, train_y, xvalid_tfidf)
# print("NB, WordLevel TF-IDF: ", accuracy)

# # Naive Bayes on Ngram Level TF IDF Vectors
# accuracy = train_model(naive_bayes.MultinomialNB(), xtrain_tfidf_ngram, train_y, xvalid_tfidf_ngram)
# print("NB, N-Gram Vectors: ", accuracy)

# # Naive Bayes on Character Level TF IDF Vectors
# accuracy = train_model(naive_bayes.MultinomialNB(), xtrain_tfidf_ngram_chars, train_y, xvalid_tfidf_ngram_chars)
# print("NB, CharLevel Vectors: ", accuracy)

# # Linear Classifier on Count Vectors
# accuracy = train_model(linear_model.LogisticRegression(), xtrain_count, train_y, xvalid_count)
# print("LR, Count Vectors: ", accuracy) # this is doing pretty good

# # Linear Classifier on Word Level TF IDF Vectors
# accuracy = train_model(linear_model.LogisticRegression(), xtrain_tfidf, train_y, xvalid_tfidf)
# print("LR, WordLevel TF-IDF: ", accuracy)

# # Linear Classifier on Ngram Level TF IDF Vectors
# accuracy = train_model(linear_model.LogisticRegression(), xtrain_tfidf_ngram, train_y, xvalid_tfidf_ngram)
# print("LR, N-Gram Vectors: ", accuracy)

# # Linear Classifier on Character Level TF IDF Vectors
# accuracy = train_model(linear_model.LogisticRegression(), xtrain_tfidf_ngram_chars, train_y, xvalid_tfidf_ngram_chars)
# print("LR, CharLevel Vectors: ", accuracy)

# # SVM on Ngram Level TF IDF Vectors
# accuracy = train_model(svm.SVC(), xtrain_tfidf_ngram, train_y, xvalid_tfidf_ngram)
# print("SVM, N-Gram Vectors: ", accuracy)

# # RF on Count Vectors
# accuracy = train_model(ensemble.RandomForestClassifier(), xtrain_count, train_y, xvalid_count)
# print("RF, Count Vectors: ", accuracy)

# # RF on Word Level TF IDF Vectors
# accuracy = train_model(ensemble.RandomForestClassifier(), xtrain_tfidf, train_y, xvalid_tfidf)
# print("RF, WordLevel TF-IDF: ", accuracy)

# # Extereme Gradient Boosting on Count Vectors
# accuracy = train_model(xgboost.XGBClassifier(), xtrain_count.tocsc(), train_y, xvalid_count.tocsc())
# print("Xgb, Count Vectors: ", accuracy)

# # Extereme Gradient Boosting on Word Level TF IDF Vectors
# accuracy = train_model(xgboost.XGBClassifier(), xtrain_tfidf.tocsc(), train_y, xvalid_tfidf.tocsc())
# print("Xgb, WordLevel TF-IDF: ", accuracy)

# # Extereme Gradient Boosting on Character Level TF IDF Vectors
# accuracy = train_model(xgboost.XGBClassifier(), xtrain_tfidf_ngram_chars.tocsc(), train_y, xvalid_tfidf_ngram_chars.tocsc())
# print("Xgb, CharLevel Vectors: ", accuracy)


########################################################

def readFile(fileName):
        fileObj = open(fileName, "r") #opens the file in read mode
        words = fileObj.read().splitlines() #puts the file into an array
        fileObj.close()
        return words

def predict():
    transaction_names = readFile('scripts/input/test-predication-data.csv')
    transaction_names_count =  count_vect.transform(transaction_names)
    classifier = linear_model.LogisticRegression()
    # fit the training dataset on the classifier
    classifier.fit(xtrain_count, train_y)
    
    # predict the labels on validation dataset
    predictions = classifier.predict(xvalid_count)

    for i in range(84):
	    print("X=%s, Predicted=%s" % (transaction_names[i], predictions[i]))

print('******************************************start predicting******************************************')
predict()
