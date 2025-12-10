# Event Management App

A modern event management application built with React, Tailwind CSS, and Firebase.

## Features

- 📊 Dashboard with statistics
- 📅 View and manage events
- ➕ Create new events
- 🗓️ Calendar view
- 🔍 Search functionality
- 🔥 Firebase real-time database
- 🎨 Modern gradient UI design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your Firebase config from Project Settings
5. Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Rules

Set up your Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{event} {
      allow read, write: if true;
    }
  }
}
```

### 4. Start the App
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production build:
```bash
npm run build
```
