const API_URL = "http://127.0.0.1:8000/notes";

async function addNote() {
  const content = document.getElementById("noteInput").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  document.getElementById("noteInput").value = "";
  loadNotes();
}

async function loadNotes() {
  const response = await fetch(API_URL);
  const notes = await response.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");
    li.innerText = note.content;
    list.appendChild(li);
  });
}

loadNotes();
