from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import pipeline
from flask_cors import CORS  # Import the CORS module

# Initialize Flask app and API
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
api = Api(app)

# Load the sentiment-analysis model
classifier = pipeline('sentiment-analysis', model="distilbert-base-uncased-finetuned-sst-2-english")

# Define the Sentiment Resource
class SentimentAnalysis(Resource):
    def post(self):
        # Get the input text from the request
        data = request.get_json()
        text = data.get('text', '')

        # Perform sentiment analysis
        result = classifier(text)
        
        # Extract label and score
        label = result[0]['label']
        score = result[0]['score']

        # Return the results as JSON
        return jsonify({
            'label': label,
            'polarity': score
        })
    
    def get(self):
        return jsonify({
            'message': 'Send a POST request to this endpoint with a JSON payload containing the text to analyze.'
        })

# Add the resource to the API
api.add_resource(SentimentAnalysis, '/analyze')

if __name__ == '__main__':
    app.run(debug=True)
