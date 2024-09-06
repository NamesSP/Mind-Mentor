from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import pipeline
from flask_cors import CORS  # Import the CORS module
import whisper
import os

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

class SpeechToText(Resource):
    def post(self):
            # Check if the request has a file part
        print("Here control")
        if 'audio' not in request.files:
            # return jsonify({"error": "No audio file provided"}), 400
            
            return jsonify({"transcription":"Looks like no audio file is present!!"})
        
        audio_file = request.files['audio']
        
        # Save the audio file temporarily
        audio_path = "./temp_audio.wav"
        audio_file.save(audio_path)

        # Load Whisper model
        model = whisper.load_model("tiny")
        
        # Transcribe the audio
        result = model.transcribe(audio_path)
        
        # Clean up the temporary audio file
        os.remove(audio_path)
        
        # Return the transcribed text
        return jsonify({"transcription": result["text"]})


# Add the resource to the API
api.add_resource(SentimentAnalysis, '/analyze')
api.add_resource(SpeechToText, '/transcribe')

if __name__ == '__main__':
    app.run(debug=True)
