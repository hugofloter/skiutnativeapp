/* Class Groups */
import { getDate } from "../utils/timeSerializer"
import User from "./user";


class Groups {
  constructor({
    id,
    name,
    owner,
    beer_call,
    user_status,
    users,
    share_position
  }) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.beer_call = beer_call;
    this.user_status = user_status || 'V';
    this.users = users;
    this.sharePosition = share_position;
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
    if(this.users){
      return Object.keys(this.users).map(i => new User(this.users[i]))
    }
    return []
  }

  getSharePosition() {
    return Boolean(this.sharePosition);
  }
}

export default Groups;
