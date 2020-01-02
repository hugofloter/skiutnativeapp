class NotificationMessage {
  constructor({
    title,
    text,
    data
  }) {
    this.title = title;
    this.text = text;
    this.data = data;
  }

  getKey() {
    return this.title;
  }

  getTitle() {
      return this.title
  }
  getText() {
      return this.text
  }

  getData() {
      return this.data
  }
}
