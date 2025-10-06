import { List, showToast, Toast, ActionPanel, Action } from "@raycast/api";
import { useState, useEffect } from "react";
import SpotifyAPI from "./utils/spotify";
import { SpotifyPlaybackState } from "./types/spotify";

export default function VolumeControl() {
  const [playbackState, setPlaybackState] = useState<SpotifyPlaybackState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const spotify = new SpotifyAPI();

  useEffect(() => {
    loadCurrentState();
  }, []);

  async function loadCurrentState() {
    try {
      setIsLoading(true);
      await spotify.authenticate();
      const state = await spotify.getCurrentPlayback();
      setPlaybackState(state);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load playback state",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function setVolume(volume: number) {
    try {
      await spotify.setVolume(volume);
      await showToast({
        style: Toast.Style.Success,
        title: `Volume set to ${volume}%`,
      });
      // Refresh the state
      await loadCurrentState();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to set volume",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (isLoading) {
    return <List isLoading={true} />;
  }

  if (!playbackState) {
    return (
      <List>
        <List.Item
          title="No active device"
          subtitle="Please open Spotify on your device first"
        />
      </List>
    );
  }

  const currentVolume = playbackState.device.volume_percent;
  const volumeOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <List>
      <List.Item
        title={`Current Volume: ${currentVolume}%`}
        subtitle={`Device: ${playbackState.device.name}`}
        icon="🔊"
        accessories={[
          {
            text: "●".repeat(Math.floor(currentVolume / 10)) + "○".repeat(10 - Math.floor(currentVolume / 10)),
          },
        ]}
      />
      
      <List.Section title="Quick Volume Controls">
        <List.Item
          title="Mute"
          subtitle="Set volume to 0%"
          icon="🔇"
          actions={
            <ActionPanel>
              <Action
                title="Mute"
                onAction={() => setVolume(0)}
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Low Volume"
          subtitle="Set volume to 25%"
          icon="🔉"
          actions={
            <ActionPanel>
              <Action
                title="Set to 25%"
                onAction={() => setVolume(25)}
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Medium Volume"
          subtitle="Set volume to 50%"
          icon="🔊"
          actions={
            <ActionPanel>
              <Action
                title="Set to 50%"
                onAction={() => setVolume(50)}
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="High Volume"
          subtitle="Set volume to 75%"
          icon="🔊"
          actions={
            <ActionPanel>
              <Action
                title="Set to 75%"
                onAction={() => setVolume(75)}
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Max Volume"
          subtitle="Set volume to 100%"
          icon="🔊"
          actions={
            <ActionPanel>
              <Action
                title="Set to 100%"
                onAction={() => setVolume(100)}
              />
            </ActionPanel>
          }
        />
      </List.Section>

      <List.Section title="Precise Volume Control">
        {volumeOptions.map((volume) => (
          <List.Item
            key={volume}
            title={`${volume}%`}
            subtitle={volume === currentVolume ? "Current volume" : `Set volume to ${volume}%`}
            icon={volume === currentVolume ? "✅" : "○"}
            actions={
              <ActionPanel>
                <Action
                  title={`Set to ${volume}%`}
                  onAction={() => setVolume(volume)}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}