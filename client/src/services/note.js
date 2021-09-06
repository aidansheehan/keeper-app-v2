const querystring = require("querystring");
const uri = "http://localhost:8000";

//let userId = "aidan";        // Needs to be lifted from log in

// NEED FUNCTION TO SEND USER TO SERVER, IF USER FOUND IN DB SEND BACK USER_id.

export function findUser(user) {
  return fetch (uri + "/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify(user)
  }).then(response => {
    if (response.status === 401) {
      return response.status;
    } else {
      return response.json();
    }
});
}

export function createUser(user) {
  return fetch(uri + "/register", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify(user)
  }).then(response => response.status)
  }

export function getNotes(userId) {
  return fetch(uri + "/notes/" + userId ).then((response) => response.json());
}

export function setNote(userId, note) {
  return fetch(uri + "/notes/" + userId, {
    method: "PATCH",
    headers: {
       "Accept": 'application/json',
       "Content-Type": "application/x-www-form-urlencoded"
  },
    body: querystring.stringify(note)
  })
  .then(data => data.text());
}

export function removeNote(userId, noteId) {
  return fetch(uri + "/notes/" + userId + "/" + noteId, {
    method: "DELETE"
  });
};
