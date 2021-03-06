class Auth {
  static currentUser = null;

  static setToken(token, refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
    return localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  static setCurrentUser(user){
    this.currentUser = user;
  }

  static getCurrentUser() {
    return this.currentUser;
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }
}

export default Auth;
