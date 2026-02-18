from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "API running"


def test_add_note():
    response = client.post(
        "/notes",
        json={"content": "Testing notes"}
    )

    assert response.status_code == 200
    assert response.json()["content"] == "Testing notes"

def test_get_notes():
    response = client.get("/notes")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_empty_note():
    response = client.post(
        "/notes",
        json={"content": ""}
    )

    assert response.status_code == 400

