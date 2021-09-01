const querystring = require("querystring");
const uri = "http://localhost:8000";

const userId = "aidan";         // Needs to be lifted from log in

export function getNotes() {
  return fetch(uri + "/" + userId ).then((response) => response.json())
  // .then(data => data.json())
}

export function setNote(note) {
  return fetch(uri + "/" + userId, {
    method: "PATCH",
    headers: {
       "Accept": 'application/json',
       "Content-Type": "application/x-www-form-urlencoded"                 //'application/x-www-form-urlencoded'
  },
    body: querystring.stringify(note)                         //JSON.stringify() ??
  })
  .then(data => data.json())
}

export function removeNote(noteId) {
  return fetch(uri + "/" + userId + "/" + noteId, {
    method: "DELETE",
    // body: JSON.stringify(note)
  })
  // .then(data => data.json())
}
