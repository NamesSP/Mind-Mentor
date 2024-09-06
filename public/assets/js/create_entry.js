var dt = new Date();
var mm = (dt.getMonth() + 1).toString().padStart(2, '0');
var dd = dt.getDate().toString().padStart(2, '0');
var yyyy = dt.getFullYear();
var dateStr = mm + "-" + dd + "-" + yyyy;
const success = document.getElementById("success");
success.textContent = "";

// Function to get audio input devices and populate a select element
async function getAudioDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

  const audioSelect = document.getElementById("audio-source");
  audioSelect.innerHTML = ""; // Clear previous options

  audioInputDevices.forEach(device => {
    const option = document.createElement("option");
    option.value = device.deviceId;
    option.text = device.label || `Microphone ${audioSelect.length + 1}`;
    audioSelect.appendChild(option);
  });
}

// For recording audio
let chunks = [];
let mediaRecorder;

const recordButton = document.getElementById("record-button");
const audioPlayback = document.getElementById("audio-playback");
console.log("control is here :", recordButton);
recordButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("record button clicked");
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    recordButton.textContent = "Record";
  } else {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      console.log("inside try block");
      const audioSource = document.getElementById("audio-source").value;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined }
      });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        console.log("data available");
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("recording stopped")
        const blob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audioPlayback.src = audioURL;
        audioPlayback.controls = true;
        console.log("#blob", blob)
        // Create a File object and use DataTransfer to assign it to the input
        const file = new File([blob], "recording.wav", { type: "audio/wav" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        document.querySelector("#audio").files = dataTransfer.files;
        console.log("#audio", document.querySelector("#audio").files[0]);
      };

      mediaRecorder.start();
      recordButton.textContent = "Stop";
    } catch (err) {
      console.error("Error accessing audio device:", err);
    }
  }
});

// Call this function to populate the select element when the page loads
getAudioDevices();

async function createDescriptionFunc(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const mood_id = document.querySelector("#mood").value.trim();
  const description = document.querySelector("#text-area").value.trim();
  const audioBlob = document.querySelector("#audio").files[0];

  const formData = new FormData();
  const formDataForAudio = new FormData();
  formData.append("title", title);
  formData.append("mood_id", mood_id);
  formData.append("description", description);
  formData.append("date_created", dateStr);
  if (audioBlob) {
    console.log("Has AudioBlob");
    formData.append("audio", audioBlob);
    formDataForAudio.append("audio", audioBlob);
  }

  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";  // Show loader

  const TranscriptionResponse = await fetch("http://localhost:5000/transcribe", {
    method: "POST",
    body: formData,
  });
  // After loading, set it back to none
  loadingElement.style.display = "none";  // Hide loader

  if (TranscriptionResponse.ok) {
    const resData = await TranscriptionResponse.json();
    console.log("transcribe success :" + resData["transcription"]);
    document.querySelector("#transcribed-text").textContent = "transcribe success :" + resData["transcription"];
  } else {
    const resData = await TranscriptionResponse.json();
    console.error(resData);
    console.log("error in transcribe api.js");
    document.querySelector("#transcribed-text").textContent = "Error in transcribing";
  }


  // Make a POST request to the analyze endpoint
  const analyzeResponse = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: description })
  });

  const analyzeResult = await analyzeResponse.json();

  document.getElementById("analyze").innerText="ANALYSIS: Label:" + analyzeResult["label"]+" Polarity :"+analyzeResult["polarity"]; // You can update the UI based on the analyzeResult

  //  // Handle the response from the analyze API
  console.log(analyzeResult); // You can update the UI based on the analyzeResult

  const response = await fetch("/api/create", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    document.querySelector("#success").textContent = "Your entry has been successfully added!";
  } else {
    const resData = await response.json();
    console.error(resData);
    console.log("error in create_entry.js");
  }

}

const createEntryForm = document.getElementById("form-description");
createEntryForm.addEventListener("submit", createDescriptionFunc);
