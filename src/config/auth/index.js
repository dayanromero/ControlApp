/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

// Dependencies
import Auth0 from 'react-native-auth0';

/**
 * Initialize Auth0
 * @return { object } Auth0 data
 */
function initializeAuth0() {
  return new Auth0({
    domain: 'dayrom.auth0.com',
    clientId: 'hzjwp5yVXdjOvCoIUw77JU56w4T653gS',
    responseType: 'token id_token',
    scope: 'openid email',
  });
}

/**
 * Make user authentication
 * @param { string } email - Email of the user
 * @param { string } password - Password of the user
 * @return { Promise } Auth0 response
 */
export function authUser(username, password) {
  const auth0 = initializeAuth0();
  return auth0.auth.passwordRealm({
    realm: 'Username-Password-Authentication',
    username,
    password,
  });
}

/**
 * Get  user  data  from Auth0 API
 * @param { string } token - AccessToken from Auth0
 * @return { Promise } Auth0 response
 */
export function getUserInfo(token) {
  const auth0 = initializeAuth0();
  return auth0.auth.userInfo({ token });
}
