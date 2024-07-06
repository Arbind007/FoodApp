import { OktaAuth } from '@okta/okta-auth-js';

var config = {
  issuer: 'https://dev-75519399.okta.com/oauth2/default',
  clientId: '0oai62lku5bCxoDHj5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'customAttributes'],
  tokenManager: {
      storage: 'localStorage',
  },
};

const oktaAuth = new OktaAuth(config);

export default oktaAuth;

