class AnimationUser {
  constructor({
    login_user,
    level
  }) {
    this.login_user = login_user;
    this.level = level;
  }

  getKey() {
    return this.login_user;
  }

  getLogin() {
      return this.login_user
  }

  getLevel() {
      return this.level
  }
}

export default AnimationUser;
