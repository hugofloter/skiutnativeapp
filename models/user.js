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
  }) {
    this.login = login;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.isAdult = is_adult || false;
    this.isAdmin = isAdmin;
    this.lastPosition = lastPosition;
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
    return this.lastPosition;
  }
}

export default User;
