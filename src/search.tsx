import { List, showToast, Toast, ActionPanel, Action } from "@raycast/api";
import { useState, useEffect } from "react";
import SpotifyAPI from "./utils/spotify";
import { SpotifySearchResult, SpotifyTrack } from "./types/spotify";

export default function SearchMusic() {
  const [searchResults, setSearchResults] = useState<SpotifySearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const spotify = new SpotifyAPI();

  useEffect(() => {
    if (searchText.trim().length > 0) {
      performSearch(searchText);
    } else {
      setSearchResults(null);
    }
  }, [searchText]);

  async function performSearch(query: string) {
    if (query.trim().length === 0) return;
    
    try {
      setIsLoading(true);
      // Search doesn't require user authentication, just client credentials
      const results = await spotify.search(query);
      setSearchResults(results);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Search failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const tracks = searchResults?.tracks.items || [];
  const artists = searchResults?.artists.items || [];
  const albums = searchResults?.albums.items || [];

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search for songs, artists, or albums..."
      throttle
    >
      {searchText.trim().length === 0 ? (
        <List.Item
          title="Start typing to search Spotify"
          subtitle="Search for songs, artists, or albums"
          icon="🎵"
        />
      ) : (
        <>
          {tracks.length > 0 && (
            <List.Section title="Tracks">
              {tracks.map((track) => (
                <List.Item
                  key={track.id}
                  title={track.name}
                  subtitle={track.artists.map(artist => artist.name).join(", ")}
                  icon={track.album.images[0]?.url}
                  accessories={[
                    {
                      text: track.album.name,
                    },
                  ]}
                  actions={
                    <ActionPanel>
                      <Action.OpenInBrowser
                        title="Open in Spotify"
                        url={track.external_urls.spotify}
                      />
                      <Action.CopyToClipboard
                        title="Copy Spotify URI"
                        content={`spotify:track:${track.id}`}
                      />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}

          {artists.length > 0 && (
            <List.Section title="Artists">
              {artists.map((artist) => (
                <List.Item
                  key={artist.id}
                  title={artist.name}
                  icon="👤"
                  actions={
                    <ActionPanel>
                      <Action.OpenInBrowser
                        title="Open in Spotify"
                        url={artist.external_urls.spotify}
                      />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}

          {albums.length > 0 && (
            <List.Section title="Albums">
              {albums.map((album) => (
                <List.Item
                  key={album.id}
                  title={album.name}
                  subtitle={album.release_date}
                  icon={album.images[0]?.url}
                  actions={
                    <ActionPanel>
                      <Action.OpenInBrowser
                        title="Open in Spotify"
                        url={album.external_urls.spotify}
                      />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}

          {tracks.length === 0 && artists.length === 0 && albums.length === 0 && !isLoading && (
            <List.Item
              title="No results found"
              subtitle="Try a different search term"
              icon="❌"
            />
          )}
        </>
      )}
    </List>
  );
}