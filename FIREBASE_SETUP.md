# Firebase Setup Instructions

## Step 1: Enable Firestore Database

1. Go to Firebase Console: https://console.firebase.google.com/project/event-management-185f8
2. Click on "Firestore Database" in the left sidebar
3. Click "Create database" button
4. Select "Start in test mode" (for development)
5. Choose your preferred location
6. Click "Enable"

## Step 2: Set Firestore Security Rules

Go to the "Rules" tab in Firestore and paste this:

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

Click "Publish" to save the rules.

## Step 3: Test the Connection

1. Open your app in the browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Try creating an event
5. Check for any error messages in the console

## Common Issues:

### Issue 1: "Missing or insufficient permissions"
- Solution: Make sure you published the security rules above

### Issue 2: "Firestore is not enabled"
- Solution: Complete Step 1 to enable Firestore

### Issue 3: Events not showing
- Solution: Check the Console tab for errors and verify Firestore rules

## Verify Data in Firebase:

1. Go to Firestore Database in Firebase Console
2. You should see an "events" collection
3. Click on it to see your events
