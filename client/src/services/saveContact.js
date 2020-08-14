export default function saveContact(data) {
  const url = process.env.URL_API || "http://localhost:8090"
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return fetch(url + "/saveContacts", options)
    .then(response => {
      if (response.status===400){
        Swal.fire('Ha ocurrido un error!!')
        return
      }
      return response.json()
    })    
}