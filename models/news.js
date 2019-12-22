/* Class News */

class News {
  constructor({
    id,
    title,
    text,
    photo,
    date,
    type
  }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.photo = photo;
    this.date = date;
    this.type = type;
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

  getPhoto() {
    return this.photo;
  }

  getDate() {
    return this.date;
  }

  getType() {
    return this.type;
  }
}

export default News;
