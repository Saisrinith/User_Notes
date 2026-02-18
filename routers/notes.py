from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import NoteCreate, NoteResponse
from services.notes_service import create_note, get_all_notes

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
