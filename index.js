const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const button = document.querySelector("#button");
const pizzaContainer = document.querySelector(".pizza");
const errorContainer = document.querySelector(".error");

//___________________________________________________________

const templatePizza = (pizzape) => {
  return `<img src="${pizzape.imagen}" alt="pizza!" />
  <div class="pizza--description">
    <h3>${pizzape.nombre}</h3>
    <span> $${pizzape.precio}</span>
  </div>
  <p class="ingredientes">Ingredientes: ${pizzape.ingredientes}</p>`;
};

const renderError = () => {
  return `<p>
    <strong></strong> No se encontraron resultados. Ingrese nuevamente un
    numero del 1 al 5.
  </p>`;
};

const showError = () => {
  errorContainer.innerHTML = renderError();
  pizzaContainer.classList.add("hidden");
  errorContainer.classList.remove("hidden");
  localStorage.removeItem("Pizza");
};

const render = () => {
  const pizzaFiltrada = pizzas.filter((pizza) => {
    return pizza.id === Number(input.value);
  });
  // console.log(pizzaFiltrada);
  pizzaContainer.innerHTML = pizzaFiltrada.map((piza) => templatePizza(piza)); //(RENDER)A la pizza filtrada se le hace un mapeo para que por cada elemento ejecute templatePizza

  localStorage.setItem("Pizza", JSON.stringify(pizzaFiltrada));
};

const showPizza = () => {
  render();

  pizzaContainer.classList.remove("hidden");
  errorContainer.classList.add("hidden");
  //_________________________________________________________

  // pizzaContainer.innerHTML = lastPizza.map((pizza) => templatePizza(pizza));
};

const renderLastPizza = () => {
  const lastPizza = JSON.parse(localStorage.getItem("Pizza"));
  if (lastPizza) {
    pizzaContainer.innerHTML = lastPizza.map((piza) => templatePizza(piza));
    pizzaContainer.classList.remove("hidden");
    errorContainer.classList.add("hidden");
  }
};

// const formError = () => {
// if (!isNaN(input.value)) { //chequea que sea numeros
//   showError();}
//   if (input.value.length === "" || input.value > 5) {
//     console.log("mal");
//   }
// };
//__________________________________________________________

// const searchFrom = () => {};

const sendForm = (e) => {
  e.preventDefault();
  const isPizzaValid = pizzas.some((inp) => {
    return inp.id === Number(input.value);
  });

  if (isPizzaValid) {
    showPizza();
  } else {
    showError();
  }
};

//____________________________________________________________

const init = () => {
  form.addEventListener("submit", sendForm);
  // input.addEventListener("input", searchFrom);
  document.addEventListener("DOMContentLoaded", renderLastPizza);
};
init();
