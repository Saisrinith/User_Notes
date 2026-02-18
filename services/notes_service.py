from sqlalchemy.orm import Session
from models import Note

def create_note(db: Session, content: str):
    note = Note(content=content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

def get_all_notes(db: Session):
    return db.query(Note).all()
