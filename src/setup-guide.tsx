import { Action, ActionPanel, Detail, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import SpotifyAPI from "./utils/spotify";

export default function SetupGuide() {
  const [isLoading, setIsLoading] = useState(false);
  const spotify = new SpotifyAPI();

  async function testConnection() {
    try {
      setIsLoading(true);
      await spotify.authenticateForSearch();
      // Test with a simple search
      await spotify.search("test");
      await showToast({
        style: Toast.Style.Success,
        title: "Connection successful!",
        message: "Spotify integration is working",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Connection failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const markdown = `
# Spotify Integration Setup Guide

## Prerequisites

1. **Spotify Premium Account**: Required for playback control
2. **Spotify Application**: Running on your Windows machine
3. **Spotify Developer App**: Create at [developer.spotify.com](https://developer.spotify.com/dashboard)

## Step 1: Create Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the details:
   - App Name: "Raycast Spotify Integration"
   - App Description: "Control Spotify from Raycast"
   - Redirect URI: \`http://localhost:3000/callback\`
   - APIs: Check "Web API"
4. Save and note your **Client ID** and **Client Secret**

## Step 2: Configure Extension

1. Open Raycast Preferences
2. Go to Extensions → Spotify Integration
3. Enter your **Client ID** and **Client Secret**

## Step 3: Authentication Flow

**Important**: This extension requires user authentication for full functionality. The current implementation provides a basic structure, but for production use, you'll need to implement OAuth2 flow.

### For Development/Testing:
- Use the search functionality (works with client credentials)
- Playback control requires user authentication

### For Production:
- Implement OAuth2 Authorization Code flow
- Handle token refresh automatically
- Store tokens securely

## Available Commands

- **Play/Pause**: Toggle playback (requires user auth)
- **Next Track**: Skip to next track (requires user auth)
- **Previous Track**: Go to previous track (requires user auth)
- **Current Track**: Show current track info (requires user auth)
- **Search Music**: Search Spotify catalog (works with client credentials)
- **Volume Control**: Adjust volume (requires user auth)

## Windows Compatibility

This extension is designed to work with Spotify on Windows by using the Spotify Web API. Make sure:

1. Spotify is running on your Windows machine
2. You're logged in to your Spotify Premium account
3. The extension has been properly configured with your app credentials

## Troubleshooting

### "No Active Device" Error
- Ensure Spotify is running and playing music
- Check that your device appears in Spotify Connect

### Authentication Errors
- Verify your Client ID and Client Secret are correct
- Check your Spotify app settings allow the redirect URI
- Ensure your Spotify account has the necessary permissions

### API Rate Limits
- The extension respects Spotify's rate limits
- If you encounter rate limiting, wait a moment before trying again

## Security Notes

- Never share your Client Secret publicly
- Store credentials securely in Raycast preferences
- Consider implementing token encryption for production use

## Next Steps

To make this extension production-ready:

1. Implement OAuth2 Authorization Code flow
2. Add proper error handling and retry logic
3. Implement token refresh mechanism
4. Add more advanced features (playlists, library management)
5. Optimize for Windows-specific behaviors
`;

  return (
    <Detail
      markdown={markdown}
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action
            title="Test Connection"
            onAction={testConnection}
            icon="🔗"
          />
          <Action.OpenInBrowser
            title="Open Spotify Developer Dashboard"
            url="https://developer.spotify.com/dashboard"
            icon="🌐"
          />
        </ActionPanel>
      }
    />
  );
}