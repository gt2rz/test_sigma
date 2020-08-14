export default function getCiudades(state_name) {
    const url = process.env.URL_API || "http://localhost:8090"
    return fetch(url + "/" + state_name + "/cities")
        .then(response => response.json())
}
