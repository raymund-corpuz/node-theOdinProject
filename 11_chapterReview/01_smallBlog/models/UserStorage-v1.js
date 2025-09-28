const { findByEmail, findById, getUsers } = require("./UserStorage");

//create class
class UserStorage {
  constructor() {
    this.users = {};
    this.idCounter = 1; //correct
  }

  //addUser
  addUser(userData) {
    const user = { id: this.idCounter, ...userData };
    this.users[this.idCounter] = user;
    this.idCounter++;
    return user; //correct
  }

  //find by email
  findByEmail(email) {
    return Object.values(this.users).find((u) => u.email === email); //correct
  }

  //find By Id
  findById(id) {
    return this.users[id]; //correct
  }

  //getUsers
  getUsers() {
    return Object.values(this.users); //correct
  }
}

module.exports = new UserStorage(); //wrong
