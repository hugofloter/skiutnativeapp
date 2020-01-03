/* Class News */

class News {
  constructor({
    id,
    title,
    text,
    img_url,
    img_width,
    img_height,
    date,
    type
  }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.imgURL = img_url;
    this.imgWidth = img_width;
    this.imgHeight = img_height;
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

  getImage() {
    if (!this.imgURL) {
      return null
    }
    return {
      uri: this.imgURL,
      width: this.imgWidth,
      height: this.imgHeight,
    }
  }

  getDate() {
    return this.date;
  }

  getType() {
    return this.type;
  }
}

export default News;
