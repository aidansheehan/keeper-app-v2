export function getNotes() {
  return fetch("http://localhost:3333/notes")
  .then(data => data.json())
}
