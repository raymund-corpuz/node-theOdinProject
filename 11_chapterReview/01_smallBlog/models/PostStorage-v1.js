//create a class
class PostStorage {
  constructor() {
    this.posts = {};
    this.idCounter = 1; //correct
  }
  //addPost
  addPost(newPost) {
    const post = { id: this.idCounter, ...newPost };
    this.posts[this.idCounter] = post;
    this.idCounter++;
    return post; //correct
  }

  //get all Post
  getAllPost() {
    return Object.values(this.posts).sort((a, b) => b.id - a.id); //correct
  }

  //get post by id
  getPostById(id) {
    return this.posts[id]; //correct
  }
}

//export class

module.exports = new PostStorage(); //correct
