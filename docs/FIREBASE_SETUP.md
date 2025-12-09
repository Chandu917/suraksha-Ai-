# Firebase Setup Instructions for Shareable Links

## Prerequisites
You need a Firebase project to enable the shareable links feature. Follow these steps:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Firestore Database** in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll set up rules next)
4. Select a location close to your users
5. Click "Enable"

## Step 3: Set Up Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read shared chats
    match /shared-chats/{chatId} {
      allow read: if true;
      allow write: if false; // Only server can write
    }
  }
}
```

3. Click "Publish"

## Step 4: Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "SurakshaGPT")
5. Copy the `firebaseConfig` object

## Step 5: Add Environment Variables

Add these variables to your `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Application URL (change this when deploying)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the placeholder values with your actual Firebase configuration values.

## Step 6: Restart Your Development Server

After adding the environment variables, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 7: Test the Feature

1. Start a conversation in the chat
2. Click the share button (next to the clear chat button)
3. A shareable link will be generated
4. Copy and open the link in a new browser window
5. The conversation should be visible to anyone with the link

## Deployment Notes

When deploying to production:
- Update `NEXT_PUBLIC_APP_URL` to your production domain
- Ensure all Firebase environment variables are set in your hosting platform
- Consider adding rate limiting to prevent abuse

## Troubleshooting

**Error: "Failed to create shareable link"**
- Check that all Firebase environment variables are set correctly
- Verify Firestore is enabled in your Firebase project
- Check browser console for detailed error messages

**Error: "Shared Chat Not Found"**
- The chat ID might be invalid
- Check Firestore security rules allow read access
- Verify the document exists in the `shared-chats` collection
