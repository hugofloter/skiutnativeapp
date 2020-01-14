/**
Class for the Bot messages
**/
class Message {
  constructor({
    id,
    text,
    type
  }) {
    this.id = id;
    this.text = text;
    this.type = type;
  }

  getKey() {
    return this.id;
  }

  getText() {
    return this.text;
  }

  getType() {
    return this.type;
  }
}

export default Message
