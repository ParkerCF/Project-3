import decode from "jwt-decode";

class AuthService {
  // getting the profile of the user
  getProfile() {
    return decode(this.getToken());
  }

  // checking if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // checking if the token has expired
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  // retrieving data saved in token
  getToken() {
    return localStorage.getItem("id_token");
  }

  // retrieving token from local storage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // clearing token from local storage
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
