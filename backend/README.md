# OpenLearn-Hub Backend

Backend server for OpenLearn-Hub with Firebase Storage integration for smart file organization.

## Features

- 🔥 Firebase Storage integration with user-specific folders
- 📁 Automatic file organization: `users/{userId}/Subject/Topic/Subtopic/filename`
- 🔄 Dual storage: localStorage + Firebase Cloud sync
- 🔐 User authentication and file ownership verification
- 📤 File upload with structured path generation
- 📥 Secure download URL generation
- 🗑️ File deletion and management

## Prerequisites

- Node.js v20.0.0 or higher
- Firebase project with Storage enabled
- Firebase Admin SDK service account key

## Setup Instructions

### 1. Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file (this is your `servicekey.json`)

### 2. Convert Service Account to Base64

You need to convert the service account JSON to a base64 string for `.env`:

**Option A: Using Node.js**
```javascript
const fs = require('fs');
const serviceKey = fs.readFileSync('path/to/servicekey.json');
const base64 = Buffer.from(serviceKey).toString('base64');
console.log(base64);
```

**Option B: Using Online Tool**
- Copy the entire content of `servicekey.json`
- Go to https://www.base64encode.org/
- Paste and encode

**Option C: Using PowerShell (Windows)**
```powershell
$bytes = [System.IO.File]::ReadAllBytes("path\to\servicekey.json")
[System.Convert]::ToBase64String($bytes)
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your configuration:
   ```env
   PORT=5000
   FIREBASE_SERVICE_ACCOUNT_BASE64=<your_base64_string_here>
   FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   FRONTEND_URL=http://localhost:5173
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
All endpoints require the `x-user-id` header for user authentication.

### `POST /api/storage/upload`
Upload a file to user's Firebase Storage.

**Headers:**
- `x-user-id`: User ID

**Body (multipart/form-data):**
- `file`: File to upload
- `metadata`: JSON string with file metadata
  ```json
  {
    "subjectName": "Computer Science",
    "topicName": "Operating Systems",
    "subtopicName": "Process Management",
    "title": "My Notes",
    "filename": "notes.pdf",
    "source": "uploaded"
  }
  ```

**Response:**
```json
{
  "success": true,
  "data": {
    "storagePath": "users/user123/Computer_Science/...",
    "downloadUrl": "https://...",
    "filename": "notes.pdf"
  }
}
```

### `POST /api/storage/sync-metadata`
Sync metadata without uploading file (for existing localStorage items).

**Headers:**
- `x-user-id`: User ID

**Body:**
```json
{
  "metadata": {
    "id": "item123",
    "name": "file.pdf",
    ...
  }
}
```

### `GET /api/storage/list`
List all files for the authenticated user.

**Headers:**
- `x-user-id`: User ID

**Response:**
```json
{
  "success": true,
  "data": {
    "files": [...],
    "count": 10
  }
}
```

### `GET /api/storage/download-url?filePath=...`
Get a secure download URL for a file.

**Headers:**
- `x-user-id`: User ID

**Query:**
- `filePath`: Path to file (e.g., `Computer_Science/OS/notes.pdf`)

### `DELETE /api/storage/delete`
Delete a file from storage.

**Headers:**
- `x-user-id`: User ID

**Body:**
```json
{
  "filePath": "Computer_Science/OS/notes.pdf"
}
```

### `POST /api/storage/check-ownership`
Check if user owns a file.

**Headers:**
- `x-user-id`: User ID

**Body:**
```json
{
  "filePath": "Computer_Science/OS/notes.pdf"
}
```

## Folder Structure

```
backend/
├── config/
│   └── firebase.config.js    # Firebase Admin SDK initialization
├── middleware/
│   └── auth.middleware.js    # Authentication middleware
├── routes/
│   └── storage.routes.js     # Storage API routes
├── services/
│   └── firebaseStorage.service.js  # Firebase Storage operations
├── utils/
│   └── pathGenerator.js      # Path generation utilities
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── server.js                 # Main server file
└── README.md
```

## File Organization

Files are automatically organized in Firebase Storage using this structure:

```
users/
├── {userId}/
│   ├── Computer_Science/
│   │   ├── Operating_Systems/
│   │   │   ├── Process_Management/
│   │   │   │   └── My_Notes.pdf
│   │   │   └── Memory_Management/
│   │   │       └── Virtual_Memory.pdf
│   │   └── Data_Structures/
│   │       └── ...
│   ├── Mathematics/
│   │   └── ...
│   └── _metadata/
│       └── {itemId}.json
```

## Troubleshooting

### Firebase initialization fails
- Verify `FIREBASE_SERVICE_ACCOUNT_BASE64` is correctly set
- Ensure the base64 string is not wrapped or truncated
- Check that `FIREBASE_STORAGE_BUCKET` is correct (format: `project-id.appspot.com`)

### CORS errors
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Ensure the frontend sends requests to the correct backend URL

### File upload fails
- Check file size (max 50MB)
- Verify all required metadata fields are provided
- Check Firebase Storage rules allow write access

## Security Notes

- **Never commit `.env` or `servicekey.json` to version control**
- The `.gitignore` is configured to prevent this
- Keep your Firebase service account key secure
- Rotate keys periodically
- Use Firebase Security Rules to restrict storage access

## License

ISC
