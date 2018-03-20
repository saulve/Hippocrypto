class User {
  constructor() {
    this.info = this.checkUser();

    return this;
  }

  getUserInfo() {
    return this.info;
  }

  isMiningSelected() {
    return this.info.selection == 'Mining' ? true : false;
  }

  saveSelection(selection) {
    this.info.selection = selection;
    window.localStorage.setItem('hippo-usr', JSON.stringify(this.info));
  }

  saveSurveyResults(surveyResults) {
    this.info.surveyResults = surveyResults;
    window.localStorage.setItem('hippo-usr', JSON.stringify(this.info));
  }

  checkUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let usr = JSON.parse(window.localStorage.getItem('hippo-usr')) || {};

      if (!usr.clientId) {
        // create a new user
        usr.clientId = this.genNewId();
        window.localStorage.setItem('hippo-usr', JSON.stringify(usr));
      }

      return usr;
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
