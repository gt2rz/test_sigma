import 'bootstrap';
import './style.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import getDepartamentos from './services/getDepartamentos.js';
import getCiudades from './services/getCiudades.js';
import saveContact from './services/saveContact';

window.addEventListener( "load", function () {
  getDepartamentos()
    .then(data => {
      addChildSelect(data,'txtDepartamento')
    })

  const departamento = document.getElementById("txtDepartamento");
  departamento.addEventListener("change",function(){
    getCiudades(event.target.value)
    .then(data => {
      document.getElementById('txtCiudad').querySelectorAll('*').forEach(n => n.remove());
      addChildSelect(data,'txtCiudad')
    });
  });

  const form = document.getElementById( "contactForm" );
  form.addEventListener("submit", function(){
    event.preventDefault();
    const data = {
      name:form['name'].value,
      email:form['email'].value,
      state:form['state'].value,
      city:form['city'].value
    }
    saveContact(data)
    .then(data => {
      if(data)
        Swal.fire('Tu información ha sido recibida satisfactoriamente')
    });
  });

  function addChildSelect(data, id){
    data.forEach(element => {
      let option = document.createElement('option')
      option.appendChild(document.createTextNode(element))
      option.setAttribute("value",element)
      document.getElementById(id).appendChild(option)
    });
  }
});
