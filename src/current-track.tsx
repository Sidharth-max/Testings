import { List, showToast, Toast, ActionPanel, Action } from "@raycast/api";
import { useState, useEffect } from "react";
import SpotifyAPI from "./utils/spotify";
import { SpotifyPlaybackState } from "./types/spotify";

export default function CurrentTrack() {
  const [playbackState, setPlaybackState] = useState<SpotifyPlaybackState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const spotify = new SpotifyAPI();

  useEffect(() => {
    loadCurrentTrack();
  }, []);

  async function loadCurrentTrack() {
    try {
      setIsLoading(true);
      await spotify.authenticate();
      const state = await spotify.getCurrentPlayback();
      setPlaybackState(state);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load current track",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <List isLoading={true} />;
  }

  if (!playbackState || !playbackState.item) {
    return (
      <List>
        <List.Item
          title="No track currently playing"
          subtitle="Start playing music on Spotify to see track information"
        />
      </List>
    );
  }

  const track = playbackState.item;
  const artists = track.artists.map(artist => artist.name).join(", ");
  const albumImage = track.album.images[0]?.url;
  const progress = playbackState.progress_ms;
  const duration = track.duration_ms;
  const progressPercent = Math.round((progress / duration) * 100);

  return (
    <List>
      <List.Item
        title={track.name}
        subtitle={`${artists} • ${track.album.name}`}
        icon={albumImage}
        accessories={[
          {
            text: `${playbackState.is_playing ? "▶️" : "⏸️"} ${progressPercent}%`,
          },
        ]}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser
              title="Open in Spotify"
              url={track.external_urls.spotify}
            />
            <Action
              title="Refresh"
              onAction={loadCurrentTrack}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="Device Information"
        subtitle={`${playbackState.device.name} (${playbackState.device.type})`}
        icon="🎵"
        accessories={[
          {
            text: `${playbackState.device.volume_percent}% volume`,
          },
        ]}
      />
      <List.Item
        title="Playback Settings"
        subtitle={`Shuffle: ${playbackState.shuffle_state ? "On" : "Off"} • Repeat: ${playbackState.repeat_state}`}
        icon="⚙️"
      />
    </List>
  );
}