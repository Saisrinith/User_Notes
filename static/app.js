const API_URL = "/notes";
const selectedNotes = new Set();

async function addNote() {
  const input = document.getElementById("noteInput");
  const content = input.value.trim();

  if (!content) {
    alert("Please enter a note");
    return;
  }

  try {
    const response = await fetch(API_URL + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content })
    });

    if (!response.ok) {
      alert("Error adding note");
      return;
    }

    input.value = "";
    input.focus();
    loadNotes();
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function loadNotes() {
  try {
    const response = await fetch(API_URL + "/");
    
    if (response.status === 404) {
      showEmpty();
      return;
    }

    if (!response.ok) {
      alert("Error loading notes");
      return;
    }

    const notes = await response.json();
    renderNotes(notes);
  } catch (error) {
    console.error("Error:", error);
    alert("Error loading notes");
  }
}

function renderNotes(notes) {
  const listDiv = document.getElementById("notesList");
  const noteCount = document.getElementById("noteCount");
  const deleteBtn = document.getElementById("deleteBtn");
  const clearBtn = document.getElementById("clearBtn");
  const selectAllSection = document.getElementById("selectAllSection");

  if (!notes || notes.length === 0) {
    showEmpty();
    return;
  }

  listDiv.innerHTML = "";
  noteCount.textContent = notes.length;
  deleteBtn.style.display = "block";
  clearBtn.style.display = "block";
  selectAllSection.style.display = "block";

  notes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-item";
    noteDiv.id = "note-" + note.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "note-checkbox";
    checkbox.value = note.id;
    checkbox.onchange = function() {
      if (checkbox.checked) {
        selectedNotes.add(note.id);
      } else {
        selectedNotes.delete(note.id);
      }
      updateSelectedCount();
    };

    const content = document.createElement("span");
    content.className = "note-content";
    content.textContent = note.content;

    const wrapper = document.createElement("div");
    wrapper.className = "note-content-wrapper";
    wrapper.appendChild(checkbox);
    wrapper.appendChild(content);

    noteDiv.appendChild(wrapper);
    listDiv.appendChild(noteDiv);
  });
}

function showEmpty() {
  const listDiv = document.getElementById("notesList");
  const noteCount = document.getElementById("noteCount");
  const deleteBtn = document.getElementById("deleteBtn");
  const clearBtn = document.getElementById("clearBtn");
  const selectAllSection = document.getElementById("selectAllSection");

  listDiv.innerHTML = '<div class="empty-state">✨ No notes yet. Add one to get started!</div>';
  noteCount.textContent = "0";
  deleteBtn.style.display = "none";
  clearBtn.style.display = "none";
  selectAllSection.style.display = "none";
  selectedNotes.clear();
  updateSelectedCount();
}

function updateSelectedCount() {
  document.getElementById("selectedCount").textContent = selectedNotes.size;
}

function selectAll() {
  const checkbox = document.getElementById("selectAllCheckbox");
  const allCheckboxes = document.querySelectorAll(".note-checkbox");

  if (checkbox.checked) {
    allCheckboxes.forEach(cb => {
      cb.checked = true;
      selectedNotes.add(parseInt(cb.value));
    });
  } else {
    allCheckboxes.forEach(cb => {
      cb.checked = false;
    });
    selectedNotes.clear();
  }

  updateSelectedCount();
}

async function deleteSelected() {
  if (selectedNotes.size === 0) {
    alert("Please select notes to delete");
    return;
  }

  if (!confirm(`Delete ${selectedNotes.size} note(s)?`)) {
    return;
  }

  try {
    for (const id of selectedNotes) {
      await fetch(API_URL + "/" + id, { method: "DELETE" });
    }
    selectedNotes.clear();
    loadNotes();
  } catch (error) {
    alert("Error deleting notes: " + error.message);
  }
}

async function clearAll() {
  const noteCount = document.getElementById("noteCount").textContent;
  
  if (noteCount === "0") {
    alert("No notes to clear");
    return;
  }

  if (!confirm(`Delete all ${noteCount} notes? Cannot undo!`)) {
    return;
  }

  try {
    const response = await fetch(API_URL + "/", { method: "DELETE" });
    if (response.ok) {
      const data = await response.json();
      alert(`✓ Deleted ${data.count} notes`);
      selectedNotes.clear();
      loadNotes();
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Load on page load
window.addEventListener('load', loadNotes);
