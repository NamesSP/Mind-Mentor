// console.log("test");
async function renderDiaryEntries() {
    const response = await fetch("/api/diary", {
        headers: {
            "Content-Type": "application/json"
        }
    } )
    
    const entries = await response.json()
    // console.log(entries);
    const diaryListContainer = document.querySelector("#diary-list-container");
    for(const entry of entries) {
        const entryContainer = document.createElement('div');
        const entryTitle = document.createElement('h2');
        const entryDate = document.createElement('h3');
        const entryDescription = document.createElement('p');
        const spanEl = document.createElement('span');
        const entryAudio = document.createElement('audio');
        const mood = entry.mood_id
        entryTitle.textContent = entry.title;
        entryDate.textContent = entry.date_created;
        entryDescription.textContent = entry.description;
        if (entry.audio_path) {
            entryAudio.src = `/${entry.audio_path}`;  // Set the correct path
            entryAudio.controls = true;
        }

         // Extract the description
         const description = entry.description;

         // Make a POST request to the analyze endpoint
         const analyzeResponse = await fetch("http://localhost:5000/analyze", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({ text: description })
         });
 
        //  const analyzeResult = await analyzeResponse.json();
 
        //  // Handle the response from the analyze API
        //  console.log(analyzeResult); // You can update the UI based on the analyzeResult
 

        
        entryContainer.classList.add("entryContainer");
        entryTitle.classList.add("entryTitle");
        entryDate.classList.add("entryDate");
        entryDescription.classList.add("entryDescription");
        // mood.classList.add("entryMood");
        entryAudio.classList.add("entryAudio"); // Set the correct path
        entryContainer.classList.add("entryContainer");
        switch(mood) {
            case 1:
                entryContainer.style.border = "5px solid black"
                break;
            case 2:
                entryContainer.style.border = "5px solid darkred"
                break;
            case 3:
                entryContainer.style.border = "5px solid red"
                break;
            case 4:
                entryContainer.style.border = "5px solid orange"
                break;
            case 5:
                entryContainer.style.border = "5px solid yellow"
                break;
            case 6:
                entryContainer.style.border = "5px solid darkgreen"
                break;
            case 7:
                entryContainer.style.border = "5px solid green"
                break;
            case 8:
                entryContainer.style.border = "5px solid lightgreen"
                break;
            case 9:
                entryContainer.style.border = "5px solid #a9ff29"
                break;
            case 10:
                entryContainer.style.border = "5px solid pink"
                break;
        }
        entryContainer.append(entryTitle, entryDate,entryDescription,entryAudio);
        diaryListContainer.append(entryContainer);
    }
}
renderDiaryEntries();