import { graficarBairstow, graficar } from "./graficar.js";
import { metodoBairstow } from "./metodo_bairstow.js";
import { falsaPosicion } from "./metodo_falsa_posicion.js";

let $selectElement = document.getElementById("metodos");
let $falsaPosicion = document.getElementById("falsa_posicion_valores");
let $bairstow = document.getElementById("bairstow_valores");
let $formulario = document.getElementById("calculadora");
let $raices = document.getElementById("raices");
let $titles = document.querySelectorAll("h2")
let $limpiar = document.getElementById("limpiar")


$limpiar.addEventListener("click", function () {

  //recargar pagina

  location.reload();
})

$selectElement.addEventListener("change", function () {
  let selectedValue = $selectElement.value;

  console.log(selectedValue);

  if (selectedValue === "falsa_posicion") {
    $falsaPosicion.classList.remove("d-none");
    $bairstow.classList.add("d-none");
  } else if (selectedValue === "bairstow") {
    $falsaPosicion.classList.add("d-none");
    $bairstow.classList.remove("d-none");
  } else {
    $falsaPosicion.classList.add("d-none");
    $bairstow.classList.add("d-none");
  }
});

function obtenerDatos() {
  let formData = new FormData($formulario);

  // Puedes acceder a los valores utilizando get()
  let funcion = formData.get("funcion");
  let metodo = formData.get("metodo");
  let xi = +formData.get("xi");
  let xf = +formData.get("xf");
  let r = +formData.get("r");
  let s = +formData.get("s");
  let tolerancia = +formData.get("tolerancia");

  // Hacer lo que necesites con los datos obtenidos (puedes imprimir en la consola para verificar)
  console.log("Función:", funcion);
  console.log("Método:", metodo);
  console.log("Xi:", xi);
  console.log("Xf:", xf);
  console.log("R:", r);
  console.log("S:", s);
  console.log("Tolerancia:", tolerancia);

  if (metodo === "falsa_posicion") {
    const {root, table} = falsaPosicion(funcion, xi, xf, tolerancia);

    $raices.innerHTML = `<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Raiz</div>
      ${root}
    </div>
  </li>`

    graficar(funcion, root);

    let columns = table[0];
    let data = table.slice(1);

    const tabla = new gridjs.Grid({
      columns,
      data
    })
    tabla.render(document.getElementById("wrapper"))



  } else if (metodo === "bairstow") {
    const { raices, table } = metodoBairstow(funcion, r, s, tolerancia);

    $raices.innerHTML = raices.map((item) => {
      
      return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Raiz</div>
                  ${item}
                </div>
              </li>`
    }).join('')


    graficarBairstow(funcion, raices);

    let columns = table[0];
    let data = table.slice(1);

    const tabla = new gridjs.Grid({
      columns,
      data
    })
    tabla.render(document.getElementById("wrapper"))
     
  }

  // Puedes realizar operaciones adicionales o enviar los datos a través de una solicitud AJAX, por ejemplo.
}

$formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  
  $titles.forEach(title => {
    title.classList.remove("d-none")
  } )

  obtenerDatos();
});
