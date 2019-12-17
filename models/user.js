/*Class User*/

class User {
  constructor({
    login,
    lastname,
    firstname,
    email,
    is_adult,
  }) {
    this.login = login;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.isAdult = is_adult || false;
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

  isAdult() {
    return this.isAdult
  }
}

export default User;
