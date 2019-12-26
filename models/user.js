/*Class User*/

class User {
  constructor({
    login,
    lastname,
    firstname,
    email,
    is_adult,
    isAdmin,
    lastPosition,
    push_token
  }) {
    this.login = login;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.isAdult = is_adult || false;
    this.isAdmin = isAdmin;
    this.lastPosition = lastPosition;
    this.push_token = push_token
  }

  getKey() {
    return this.login;
  }

  getLogin() {
    return this.login;
  }

  getLastname() {
    return this.lastname;
  }

  getFirstname() {
    return this.firstname;
  }

  getEmail() {
    return this.email;
  }

  getAdult() {
    return Boolean(this.isAdult);
  }

  getAdmin() {
    return Boolean(this.isAdmin);
  }

  getLastPosition() {
    return Boolean(this.lastPosition);
  }

  getPushToken() {
    return this.push_token;
  }
}

export default User;
