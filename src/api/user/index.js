class User {
  constructor() {
    return this.checkUser();
  }

  checkUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let usr = window.localStorage.getItem('hippo-usr');
      if (usr) {
        return JSON.parse(usr);
      } else {
        usr = {
          id: this.genNewId(),
          startTime: new Date()
        }
        window.localStorage.setItem('hippo-usr', JSON.stringify(usr));
        return usr;
      }
    }
  }

  genNewId() {
    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default User;