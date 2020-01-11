/*Class User*/

class User {
  constructor({
    login,
    lastname,
    firstname,
    email,
    isAdmin,
    location,
    status,
    expiration_date,
    push_token,
    avatar
  }) {
    this.login = login;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.isAdmin = isAdmin;
    this.location = location;
    this.status = status;
    this.expirationDate = expiration_date;
    this.pushToken = push_token;
    this.avatar = avatar;
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

  getAdmin() {
    return Boolean(this.isAdmin);
  }

  getLocation() {
    return this.location;
  }

  getStatus() {
    return this.status;
  }

  getExpirationDate() {
    return this.expirationDate;
  }

  getPushToken() {
    return this.pushToken;
  }

  getAvatar() {
    if(this.avatar && this.avatar.img_url) {
      return this.avatar;
    }
    return null;
  }
}

export default User;
