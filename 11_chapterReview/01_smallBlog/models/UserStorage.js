// class UserStorage {
//   constructor() {
//     this.users = {};
//     this.idCounter = 1;
//   }

//   //add User object { username, email, password}
//   addUser(userData) {
//     const user = { id: this.idCounter, ...userData };

//     this.users[this.idCounter] = user;
//     this.idCounter++;
//     return user;
//   }

//   //find by email (returns user or undefined)
//   findByEmail(email) {
//     return Object.values(this.users).find((u) => u.email === email);
//   }

//   //find by id
//   findById(id) {
//     return this.users[id];
//   }

//   //find all users
//   getUsers() {
//     return Object.values(this.users);
//   }
// }

// module.exports = new UserStorage();

// ============ Re-create ===================

class UserStorage {
  //correct
  constructor() {
    this.users = {};
    this.idCounter = 1; //correct
  }

  addUser(userData) {
    const user = { id: this.idCounter, ...userData };
    this.users[this.idCounter] = user;
    this.idCounter++;
    return user; //correct
  }

  findByEmail(email) {
    return Object.values(this.users).find((u) => u.email === email); //correct
  }

  findById(id) {
    return this.users[id]; //correct
  }

  getUsers() {
    return Object.values(this.users); //correct
  }
}

module.exports = new UserStorage(); //correct
