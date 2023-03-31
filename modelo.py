from flask import Flask, request, jsonify
import tensorflow as tf

app = Flask(__name__)
model = tf.keras.models.load_model('modelo.h5')

@app.route('/predict_demand', methods=['POST'])
def predict_demand():
    data = request.json
    input = tf.convert_to_tensor(data)
    prediction = model.predict(input)
    return jsonify(prediction[0][0])

if __name__ == '__main__':
    app.run()
