/* Class Groups */
import { getDate } from "../utils/timeSerializer"

class UserGroup {
  constructor({
    expiration_date,
    id_group,
    login_user,
    share_position,
    status,
    location
  }) {
    this.id_group = id_group;
    this.status = status;
    this.share_position = share_position;
    this.login_user = login_user;
    this.expiration_date = expiration_date;
    if (location) {
      this.location = location
    }
  }

  getKey() {
    return this.id_group;
  }

  getStatus() {
    return this.status;
  }

  isSharingPosition() {
    return this.share_position;
  }

  getLogin() {
    return this.login_user;
  }

  getExpirationDate() {
    return this.expiration_date;
  }

  getLocation() {
    return this.location
  }

}

class Groups {
  constructor({
    id,
    name,
    owner,
    beer_call,
    user_status,
    users
  }) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.beer_call = beer_call;
    this.user_status = user_status || 'V';
    this.users = users;
  }

  getKey() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getOwner() {
    return this.owner;
  }

  getBeerCall() {
    if (this.beer_call) {
      return getDate(this.beer_call);
    } else {
      return null
    }
  }

  getUserStatus() {
    return this.user_status;
  }

  getUsersInGroup() {
    let list_users = []
    Object.keys(this.users).map(i => {
      list_users[i] = new UserGroup(this.users[i])
    })
    return list_users;
  }
}

export default Groups;
