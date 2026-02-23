from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import NoteCreate, NoteResponse
from services.notes_service import create_note, get_all_notes, delete_note, delete_all_notes

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.post("/", response_model=NoteResponse)
def add_note(note: NoteCreate, db: Session = Depends(get_db)):
    if not note.content.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Note content cannot be empty"
        )

    return create_note(db, note.content)


@router.get("/", response_model=list[NoteResponse])
def read_notes(db: Session = Depends(get_db)):
    notes = get_all_notes(db)

    if not notes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No notes found"
        )

    return notes


@router.delete("/{note_id}", response_model=dict)
def remove_note(note_id: int, db: Session = Depends(get_db)):
    result = delete_note(db, note_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    return {"message": "Note deleted successfully", "id": note_id}


@router.delete("/")
def clear_all_notes(db: Session = Depends(get_db)):
    count = delete_all_notes(db)
    return {"message": f"Deleted {count} notes", "count": count}
