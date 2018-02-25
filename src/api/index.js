import $ from 'jquery';

class Api {
  constructor() {
  }

  static sendAnalytics(data) {
    $.ajax({
        type: 'POST',
        url: 'http://159.89.238.13/hippo/user/',
        data: JSON.stringify(data),
        contentType: 'application/json',
        async: false
      });
  }

  static getLocation() {
    return $.ajax({
        type: 'GET',
        url: 'http://ip-api.com/json',
    })
    .then((response) => {
      if (response.country) {
        return response.country;
      } else {
        return 'Usnidentified location';
      }
    });
  }
}

export default Api;