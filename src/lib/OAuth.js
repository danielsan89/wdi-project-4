import queryString from 'query-string';

class OAuth {
  // create a settings object for each of the providers you wish to support
  // tip: you can lift this almost directly from the satellizer docs: https://github.com/sahat/satellizer#configuration
  static providers = [{
    name: 'spotify',
    url: '/api/oauth/spotify',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scope: ['user-read-private user-read-email user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-modify-playback-state'],
    clientId: 'be0c644bd7d943b5a8727fd2c6df7883' // paste your Client ID here
  }];


  // method to generate the correct href for the oAuth popup, based on the current URL in the address bar
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
