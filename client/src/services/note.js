export function getNotes() {
  return fetch("http://localhost:3333/notes")
  .then(data => data.json())
}

export function setNote(note) {
  return fetch("http://localhost:3333/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  })
  .then(data => data.json())
}

export function removeNote(note) {
  return fetch("http://localhost:3333/notes", {
    method: "DELETE",
    body: JSON.stringify(note)
  }).then(data => data.json())
}
