from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Note

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return{"status" : "Notes API running"}

@app.post("/notes")
def create_note(content: str, db: Session = Depends(get_db)):
    note = Note(content=content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.get("/notes")
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    return notes
