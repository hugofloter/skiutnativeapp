/*Class Potin*/

class Potin {
  constructor({
    id,
    title,
    text,
    approved,
    sender,
    isAnonymous
  }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.approved = approved || false;
    this.sender = sender || '';
    this.isAnonymous = isAnonymous;
  }

  getKey() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getText() {
    return this.text;
  }

  getSender() {
    return this.sender;
  }

  isAnonymous() {
    return this.isAnonymous;
  }

  isApproved() {
    return this.approved;
  }
}

export default Potin;
