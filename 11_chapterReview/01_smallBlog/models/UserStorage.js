class UserStorage {
  constructor() {
    this.users = {};
    this.idCounter = 1;
  }

  //add User object { username, email, password}
  addUser(userData) {
    const user = { id: this.idCounter, ...userData };

    this.users[this.idCounter] = user;
    this.idCounter++;
    return user;
  }

  //find by email (returns user or undefined)
  findByEmail(email) {
    return Object.values(this.users).find((u) => u.email === email);
  }

  //find by id
  findById(id) {
    return this.users[id];
  }

  //find all users
  getUsers() {
    return Object.values(this.users);
  }
}

module.exports = new UserStorage();
