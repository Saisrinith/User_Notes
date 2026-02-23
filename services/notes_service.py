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

def delete_note(db: Session, note_id: int):
    note = db.query(Note).filter(Note.id == note_id).first()
    if note:
        db.delete(note)
        db.commit()
        return True
    return False

def delete_all_notes(db: Session):
    count = db.query(Note).count()
    db.query(Note).delete()
    db.commit()
    return count
