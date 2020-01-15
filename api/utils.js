
export class APIError extends Error {
  constructor(message, response, value) {
    super();
    this.message = message;
    this.response = response;
    this.value = value;

  }

  get status() {
    return this.response.status;
  }

  getMessage() {
    return this.message
  }
}

export class BaseModel {
  constructor(values) {
    Object.assign(this, values)
  }

  getKey(){
    return this.id
  }
}
