import { showToast, Toast } from "@raycast/api";
import SpotifyAPI from "./utils/spotify";

export default async function NextTrack() {
  const spotify = new SpotifyAPI();
  
  try {
    await spotify.authenticate();
    
    const playbackState = await spotify.getCurrentPlayback();
    if (!playbackState) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No Active Device",
        message: "Please open Spotify on your device first",
      });
      return;
    }

    await spotify.nextTrack();
    
    // Wait a moment for the track to change
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPlaybackState = await spotify.getCurrentPlayback();
    await showToast({
      style: Toast.Style.Success,
      title: "Next Track",
      message: newPlaybackState?.item?.name || "Skipped to next track",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to skip to next track",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}