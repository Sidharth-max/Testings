# Spotify Integration for Raycast

A Raycast extension that allows you to control Spotify playback and search music directly from Raycast on Windows.

## Features

- **Play/Pause**: Control playback with a simple command
- **Skip Tracks**: Go to next or previous track
- **Current Track**: View information about the currently playing track
- **Search Music**: Search for songs, artists, and albums
- **Volume Control**: Adjust Spotify volume with predefined levels or precise control

## Setup

1. **Create a Spotify App**:
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Note your Client ID and Client Secret

2. **Configure the Extension**:
   - Install the extension in Raycast
   - Go to extension preferences
   - Enter your Spotify Client ID and Client Secret

3. **Usage**:
   - Make sure Spotify is running on your Windows machine
   - Use the commands from Raycast to control playback

## Commands

- `Play/Pause` - Toggle playback
- `Next Track` - Skip to next track  
- `Previous Track` - Go to previous track
- `Current Track` - View current track information
- `Search Music` - Search and play music
- `Volume Control` - Adjust volume

## Windows Compatibility

This extension is designed to work with Spotify on Windows. It uses the Spotify Web API to control playback, which requires an active Spotify session on your device.

## Requirements

- Raycast (macOS)
- Spotify Premium account (for full playback control)
- Active Spotify session on Windows

## Development

To develop this extension:

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## License

MIT