from fastapi import FastAPI
from fastapi.responses import FileResponse
from database import engine, Base
from routers import notes, auth
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, OPTIONS, etc
    allow_headers=["*"],  # Authorization, Content-Type
)


app.include_router(notes.router)
app.include_router(auth.router)
app.include_router(notes.router)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def home():
    return FileResponse("static/index.html")

@app.get("/api/status")
def api_status():
    return {"status": "API running"}
