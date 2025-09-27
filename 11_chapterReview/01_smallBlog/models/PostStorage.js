class PostStorage {
  constructor() {
    this.posts = {};
    this.idCounter = 1;
  }

  addPost(postData) {
    const post = { id: this.idCounter, ...postData };
    this.posts[this.idCounter] = post;
    this.idCounter++;
    return post;
  }

  getAllPost() {
    // return post newest first
    return Object.values(this.posts).sort(a, (b) => b.id - a.id);
  }

  getPost(id) {
    return this.posts[id];
  }
}
