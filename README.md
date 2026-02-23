# 📝 My Notes App

> A beautiful, modern web application to keep all your thoughts and ideas organized in one place.

![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128+-green?logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue?logo=sqlite)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ✅ **Add Notes** - Quickly add notes by typing and pressing Enter
- ✅ **View Notes** - See all your notes in a beautiful organized list
- ✅ **Select Notes** - Use checkboxes to select multiple notes at once
- ✅ **Delete Selected** - Remove only the notes you want to delete
- ✅ **Clear All** - Delete all notes with one click (with confirmation)
- ✅ **Select All** - Quickly select or deselect all notes
- ✅ **Real-time Counter** - Track total notes and selected notes
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Beautiful UI** - Modern gradient design with smooth animations
- ✅ **Persistent Storage** - All notes saved in SQLite database
- ✅ **Fast & Reliable** - Built with FastAPI for optimal performance

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- OR Python 3.9+ and pip

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd notes-app

# Build the Docker image
docker build -t notes-api .

# Run the container
docker run -d -p 8000:8000 --name notes-api notes-api

# Open your browser
# Navigate to http://localhost:8000
```

### Option 2: Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn main:app --reload

# Open your browser
# Navigate to http://localhost:8000
```

## 📁 Project Structure

```
notes-app/
├── main.py                 # FastAPI application entry point
├── database.py             # SQLite database configuration
├── models.py               # SQLAlchemy models (Note, User)
├── schemas.py              # Pydantic request/response schemas
├── requirements.txt        # Python dependencies
├── Dockerfile              # Docker configuration
├── routers/
│   ├── notes.py           # Notes API endpoints
│   └── auth.py            # Authentication endpoints
├── services/
│   └── notes_service.py   # Business logic for notes
├── static/
│   ├── index.html         # Frontend HTML
│   ├── app.js             # Frontend JavaScript
│   └── style.css          # Frontend styling
└── tests/                 # Test files
```

## 🛠️ API Endpoints

### Notes Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/notes/` | Create a new note |
| `GET` | `/notes/` | Get all notes |
| `DELETE` | `/notes/{id}` | Delete a specific note |
| `DELETE` | `/notes/` | Delete all notes |

### Example Requests

```bash
# Add a note
curl -X POST http://localhost:8000/notes/ \
  -H "Content-Type: application/json" \
  -d '{"content": "Buy groceries"}'

# Get all notes
curl http://localhost:8000/notes/

# Delete a note
curl -X DELETE http://localhost:8000/notes/1

# Delete all notes
curl -X DELETE http://localhost:8000/notes/
```

## 💻 How to Use

### Adding Notes
1. Type your note in the input field
2. Press **Enter** or click the **➕ Add Note** button
3. Your note appears instantly in the list

### Selecting Notes
1. Click the **checkbox** next to any note to select it
2. Click **Select All** checkbox to select all notes at once
3. The "Selected" counter updates automatically

### Deleting Notes
1. **Delete Selected**: Select notes using checkboxes, then click **🗑️ Delete Selected**
2. **Clear All**: Click **🔥 Clear All** to delete all notes at once
3. You'll be asked for confirmation before deletion

### Keyboard Shortcuts
- **Enter** - Add a new note (when input is focused)

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   Frontend (HTML/CSS/JS)        │
│   - User Interface              │
│   - Interactive Components      │
│   - Real-time Updates          │
└────────────┬────────────────────┘
             │ HTTP Requests
             ↓
┌─────────────────────────────────┐
│   FastAPI Backend               │
│   - REST API                    │
│   - Request Validation          │
│   - Business Logic              │
└────────────┬────────────────────┘
             │ SQL Queries
             ↓
┌─────────────────────────────────┐
│   SQLite Database               │
│   - Persistent Storage          │
│   - ACID Transactions           │
│   - Data Integrity             │
└─────────────────────────────────┘
```

## 🎨 Technology Stack

### Backend
- **FastAPI** - Modern, fast web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Fetch API** - Asynchronous HTTP requests

### Database
- **SQLite** - Lightweight, file-based database

### Deployment
- **Docker** - Container orchestration
- **Python 3.9** - Runtime environment

## 📊 Database Schema

### Notes Table
```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR NOT NULL
);
```

### Users Table (for future auth)
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL
);
```

## 🔒 CORS Configuration

The application has CORS (Cross-Origin Resource Sharing) enabled to allow requests from:
- All origins (*)
- All methods (GET, POST, DELETE, etc.)
- All headers

*Note: In production, restrict this to specific domains for security.*

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=.
```

## 📦 Dependencies

```
fastapi==0.128.8
uvicorn==0.39.0
sqlalchemy==2.0.46
pydantic==2.12.5
pytest==8.4.2
httpx==0.28.1
passlib[bcrypt]==1.7.4
python-jose==3.5.0
```

## 🚢 Deployment

### Using Docker

```bash
# Build image
docker build -t notes-api .

# Run container
docker run -d -p 8000:8000 --name notes-api notes-api

# View logs
docker logs notes-api

# Stop container
docker stop notes-api
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## 🎯 Future Features

- [ ] User authentication and accounts
- [ ] Search and filter notes
- [ ] Edit existing notes
- [ ] Add timestamps to notes
- [ ] Organize notes by categories/tags
- [ ] Export notes to PDF/CSV
- [ ] Dark mode toggle
- [ ] Sort notes (date, alphabetical)
- [ ] Rich text editor
- [ ] Note sharing
- [ ] Cloud sync

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips & Best Practices

### Performance
- Notes are cached in the browser for faster interactions
- Database queries are optimized with proper indexing
- API responses are fast with minimal payload

### Security
- Input validation with Pydantic schemas
- SQL injection prevention with SQLAlchemy ORM
- XSS protection with proper HTML escaping
- CORS configured for safe cross-origin requests

### User Experience
- Smooth animations for better visual feedback
- Keyboard support (Enter to add notes)
- Real-time counters for selected/total notes
- Confirmation dialogs for destructive actions
- Responsive design adapts to any screen size

## 🐛 Troubleshooting

### Notes showing as `{content: Goal}`
- Clear browser cache: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Clear cookies and site data in DevTools

### Container not starting
```bash
# Check logs
docker logs notes-api

# Check if port 8000 is in use
lsof -i :8000

# Use different port
docker run -d -p 8080:8000 --name notes-api notes-api
```

### Database errors
```bash
# Remove old database
rm notes.db

# Restart container
docker restart notes-api
```

## 📞 Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include screenshots/error messages
4. Mention your OS and browser version

## 🙏 Acknowledgments

- Built with **FastAPI** - Amazing modern Python web framework
- Styled with **CSS3** - Modern responsive design
- Powered by **SQLite** - Reliable database
- Containerized with **Docker** - Consistent deployment

---

**Made with ❤️ | My Notes App**

Happy note-taking! 📝✨
