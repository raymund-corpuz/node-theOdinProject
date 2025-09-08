// const person = {
//   name: "Jason Doe",
//   age: 29,
// };

// module.exports = person;

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`My name is ${this.name} and I'm  ${this.age}  `);
  }
}

module.exports = Person;
