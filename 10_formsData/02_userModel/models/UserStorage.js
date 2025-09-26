class UsersStorage {
  constructor() {
    this.users = {};
    this.idCounter = 1;
  }

  addUser(userData) {
    const user = { id: this.idCounter, ...userData };

    this.users[this.idCounter] = user;
    this.idCounter++;
    return this.user;
  }

  getUsers() {
    return Object.values(this.users);
  }
}

module.exports = new UsersStorage(); //singleton instance
