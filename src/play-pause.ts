import { showToast, Toast } from "@raycast/api";
import SpotifyAPI from "./utils/spotify";

export default async function PlayPause() {
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

    await spotify.playPause();
    
    const newState = playbackState.is_playing ? "Paused" : "Playing";
    await showToast({
      style: Toast.Style.Success,
      title: `${newState}`,
      message: playbackState.item?.name || "Unknown track",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to control playback",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}