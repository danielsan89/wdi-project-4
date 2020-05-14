import queryString from 'query-string';
import env from '../../config/environment';

class OAuth {
  static providers = [{
    name: 'spotify',
    url: '/api/oauth/spotify',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scope: ['user-read-private user-read-email user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-modify-playback-state'],
    clientId: env.spotifyAppId
  }];

  static getAuthLink(provider) {
    const qs = {
      scope: provider.scope,
      client_id: provider.clientId,
      redirect_uri: window.location.href,
      response_type: 'code'
    };

    return `${provider.authEndpoint}?${queryString.stringify(qs)}`;
  }

  // method to return the relevant setting object based on name of the provider
  static getProvider(providerName) {
    const provider = this.providers.find(provider => provider.name = providerName);
    provider.authLink = this.getAuthLink(provider);
    return provider;
  }
}

export default OAuth;
