import axios, { AxiosInstance } from "axios";
import { getPreferenceValues, LocalStorage } from "@raycast/api";
import { SpotifyTokenResponse, SpotifyPlaybackState, SpotifySearchResult } from "../types/spotify";

interface Preferences {
  clientId: string;
  clientSecret: string;
}

class SpotifyAPI {
  private client: AxiosInstance;
  private preferences: Preferences;

  constructor() {
    this.preferences = getPreferenceValues<Preferences>();
    this.client = axios.create({
      baseURL: "https://api.spotify.com/v1",
      timeout: 10000,
    });

    // Add request interceptor to include access token
    this.client.interceptors.request.use(async (config) => {
      const token = await this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          await this.refreshToken();
          // Retry the original request
          const token = await this.getAccessToken();
          if (token) {
            error.config.headers.Authorization = `Bearer ${token}`;
            return this.client.request(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async getAccessToken(): Promise<string | null> {
    return await LocalStorage.getItem<string>("spotify_access_token");
  }

  private async setAccessToken(token: string): Promise<void> {
    await LocalStorage.setItem("spotify_access_token", token);
  }

  private async getRefreshToken(): Promise<string | null> {
    return await LocalStorage.getItem<string>("spotify_refresh_token");
  }

  private async setRefreshToken(token: string): Promise<void> {
    await LocalStorage.setItem("spotify_refresh_token", token);
  }

  async authenticateForSearch(): Promise<void> {
    try {
      // Check if we already have a valid token
      const existingToken = await this.getAccessToken();
      const expirationTime = await LocalStorage.getItem<string>("spotify_token_expiration");
      
      if (existingToken && expirationTime && Date.now() < parseInt(expirationTime)) {
        return; // Token is still valid
      }

      // Use Client Credentials flow for search functionality
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${this.preferences.clientId}:${this.preferences.clientSecret}`
            ).toString("base64")}`,
          },
        }
      );

      const tokenData: SpotifyTokenResponse = response.data;
      await this.setAccessToken(tokenData.access_token);
      
      // Set expiration time
      const expirationTime = Date.now() + tokenData.expires_in * 1000;
      await LocalStorage.setItem("spotify_token_expiration", expirationTime.toString());
      
    } catch (error) {
      console.error("Authentication failed:", error);
      throw new Error("Failed to authenticate with Spotify. Please check your credentials.");
    }
  }

  async authenticate(): Promise<void> {
    try {
      // Check if we already have a valid token
      const existingToken = await this.getAccessToken();
      const expirationTime = await LocalStorage.getItem<string>("spotify_token_expiration");
      
      if (existingToken && expirationTime && Date.now() < parseInt(expirationTime)) {
        // Try to use existing token
        try {
          await this.client.get("/me");
          return; // Token is still valid
        } catch (error) {
          // Token is invalid, continue with re-authentication
        }
      }

      // For controlling playback, we need user authentication
      // This is a simplified approach - in a real implementation, you'd use OAuth2 flow
      throw new Error("User authentication required. Please set up OAuth2 flow for full functionality.");
      
    } catch (error) {
      console.error("Authentication failed:", error);
      throw new Error("Failed to authenticate with Spotify. Please check your credentials.");
    }
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) {
      await this.authenticate();
      return;
    }

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${this.preferences.clientId}:${this.preferences.clientSecret}`
            ).toString("base64")}`,
          },
        }
      );

      const tokenData: SpotifyTokenResponse = response.data;
      await this.setAccessToken(tokenData.access_token);
      
      if (tokenData.refresh_token) {
        await this.setRefreshToken(tokenData.refresh_token);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await this.authenticate();
    }
  }

  async getCurrentPlayback(): Promise<SpotifyPlaybackState | null> {
    try {
      const response = await this.client.get<SpotifyPlaybackState>("/me/player");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 204) {
        return null; // No active device
      }
      throw error;
    }
  }

  async playPause(): Promise<void> {
    const playbackState = await this.getCurrentPlayback();
    if (!playbackState) {
      throw new Error("No active Spotify device found");
    }

    if (playbackState.is_playing) {
      await this.client.put("/me/player/pause");
    } else {
      await this.client.put("/me/player/play");
    }
  }

  async nextTrack(): Promise<void> {
    await this.client.post("/me/player/next");
  }

  async previousTrack(): Promise<void> {
    await this.client.post("/me/player/previous");
  }

  async setVolume(volumePercent: number): Promise<void> {
    await this.client.put(`/me/player/volume?volume_percent=${volumePercent}`);
  }

  async search(query: string, types: string[] = ["track", "artist", "album"]): Promise<SpotifySearchResult> {
    // Use client credentials authentication for search
    await this.authenticateForSearch();
    
    const response = await this.client.get<SpotifySearchResult>("/search", {
      params: {
        q: query,
        type: types.join(","),
        limit: 20,
      },
    });
    return response.data;
  }

  async playTrack(trackUri: string): Promise<void> {
    await this.client.put("/me/player/play", {
      uris: [trackUri],
    });
  }
}

export default SpotifyAPI;

// Export the authenticateForSearch method for components that only need search functionality
export { SpotifyAPI };