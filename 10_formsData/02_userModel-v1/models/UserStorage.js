class UsersStorage {
  constructor() {
    this.users = {};
    this.idCounter = 1;
  }

  addUser(userData) {
    const user = {
      id: this.idCounter,
      ...userData,
    };

    this.users[this.idCounter] = user;
    this.idCounter++;
    return user;
  }

  getUsers() {
    return Object.values(this.users);
  }
}

module.exports = new UsersStorage();

/* ========== example ==================
const storage = new UsersStorage();

const user1 = storage.addUser({
  username: "Alice",
  email: "alice@example.com",
});
const user2 = storage.addUser({
  username: "Bob",
  email: "bob@example.com",
});

console.log(user1);

const all = storage.getUsers();
console.log(all);
*/
