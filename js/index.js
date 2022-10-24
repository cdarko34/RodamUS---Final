const nombre = document.querySelector('#nombre');
const telefono = document.querySelector('#telefono');
const zip = document.querySelector('#zip');
const email = document.querySelector('#email');
const email2 = document.querySelector('#email2');
const boton = document.querySelector('#boton');
// Llama al div contenedor de los pases
const lista = document.querySelector('#contenedor-pases');
const contenedorDePrecios = document.getElementById('contenedor-precio');



function mostrarPrecio(paquete){
    contenedorDePrecios.innerHTML = "";
  
    contenedorDePrecios.innerHTML = `
      Total: $ ${paquete.precio} 
    `;

    return contenedorDePrecios;
  }


  function crearBotonSeleccionar(paquete){

    const button = document.createElement("a");
    button.innerText = "Seleccionar";
    button.addEventListener("click", () => {
        mostrarPrecio(paquete);
      })
    return button;
  }


// Crea los ases con base en los 
fetch('../js/data.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((paquete) => {
            const li = document.createElement('li');

            li.innerHTML = `
                <h4>${paquete.titulo}</h4>
                <p class="precios fw-bold">$ ${paquete.precio}</p>
                <p class="list-group-item border-0 ">${paquete.caracteristicas}</p>
            `

            lista.append(li)
            const botonSeleccionar = crearBotonSeleccionar(paquete)
            lista.appendChild(botonSeleccionar);
        })
    })


class Registro {
    empezarRegistro(nombre, telefono, zip, email, email2){
        const infoRegistro = {
            nombre : nombre,
            telefono : telefono,
            zip : zip,
            email : email,
            email2 : email2,
        }

        this.guardarRegistroEnLocalStorage(infoRegistro);
    }

    guardarRegistroEnLocalStorage(infoRegistro) {
        let registro;

        registro = this.obtenerRegistroLocalStorage();
        
        registro.push(infoRegistro);

        localStorage.setItem('registro', JSON.stringify(registro));
    
    }

    obtenerRegistroLocalStorage(){
        let registroLocalStorage;

        if (localStorage.getItem('registro')===null) {
            
            registroLocalStorage = [];

        }else {
            
            registroLocalStorage = JSON.parse(localStorage.getItem('registro'));

        }
        return registroLocalStorage;
    }


}


const registro = new Registro();



cargarEventos();
function cargarEventos() {
    boton.addEventListener ('click', verificar);
}

function verificar(e) {
    e.preventDefault();

    const validacion = document.querySelector('#texto-validacion');

    if (nombre.value === '' || telefono.value === '' || zip.value === '' || email.value === '' || email2.value === '' || contenedorDePrecios.value == 'Total: $0') {

        validacion.innerHTML = `
        <p class="validacion">Ingresa los campos requeridos</p>
        `
        
    }
    else {
        registro.empezarRegistro(nombre, telefono, zip, email, email2);

        Swal.fire(
            'Estás a unos pasos de asistir al evento',
            'Enviamos a tu correo electrónico un link para realizar tu pago',
            'success'
          )
    }


}

    