var dt = new Date();
var mm = (dt.getMonth()+ 1).toString().padStart(2, '0');
var dd = dt.getDate().toString().padStart(2, '0');
var yyyy = dt.getFullYear();
var dateStr = mm+"-"+dd+"-"+yyyy;
// console.log(dt);
// console.log(mm);
// console.log(dd);
// console.log(yyyy);
// console.log(mm+"-"+dd+"-"+yyyy);
// console.log(dateStr);
const success = document.getElementById("success")
success.textContent = "";

async function createDescriptionFunc(event) {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const mood_id = document.querySelector("#mood").value.trim();
    const description = document.querySelector("#text-area").value.trim();
    const audio = document.querySelector("#audio").files[0];
    // console.log(mood);
    // console.log("This is createDescriptionFunc");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("mood_id", mood_id);
    formData.append("description", description);
    formData.append("audio", audio);
    formData.append("date_created", dateStr);

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
  const createEntryForm = document.getElementById("form-description");//targets our form in html
  // console.log(createEntryForm);
createEntryForm.addEventListener("submit", createDescriptionFunc);

// document.querySelector("#create-entry-form").addEventListener("submit", createDescriptionFunc);