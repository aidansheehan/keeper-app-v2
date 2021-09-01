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
  }).then(response => response.json())//.then(data => userId = data)
}

export function getNotes(userId) {
  return fetch(uri + "/notes/" + userId ).then((response) => response.json())
  // .then(data => data.json())
}

export function setNote(userId, note) {
  return fetch(uri + "/notes/" + userId, {
    method: "PATCH",
    headers: {
       "Accept": 'application/json',
       "Content-Type": "application/x-www-form-urlencoded"                 //'application/x-www-form-urlencoded'
  },
    body: querystring.stringify(note)                         //JSON.stringify() ??
  })
  .then(data => data.json())
}

export function removeNote(userId, noteId) {
  return fetch(uri + "/notes/" + userId + "/" + noteId, {
    method: "DELETE",
    // body: JSON.stringify(note)
  })
  // .then(data => data.json())
}
