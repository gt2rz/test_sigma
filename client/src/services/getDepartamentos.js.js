export default function getDepartamentos() {
    const url = process.env.URL_API || "http://localhost:8090"
    return fetch(url +"/states")
        .then(response => response.json())
}
