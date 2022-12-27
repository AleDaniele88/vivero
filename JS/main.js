const stockProducts = [
    {
        id:1,
        name: "Planta 1",
        quantity: 1,
        desc: "Planta para interiores, ideal para verano",
        price: 150,
        img: "./ASSETS/planta.jpg"
    },

    {
        id:2,
        name: "Planta 2",
        quantity: 1,
        desc: "Planta para interiores, ideal para verano",
        price: 150,
        img: "./ASSETS/planta.jpg"
    },

    {
        id:3,
        name: "Planta 3",
        quantity: 1,
        desc: "Planta para interiores, ideal para verano",
        price: 150,
        img: "./ASSETS/planta.jpg"
    },

    {
        id:4,
        name: "Planta 4",
        quantity: 1,
        desc: "Planta para interiores, ideal para verano",
        price: 150,
        img: "./ASSETS/planta.jpg"
    }
]

let carrito = [];
let contenedor = document.getElementById("contenedor");
let modal = document.querySelector(".modal-body")
let carritoContenedor = document.getElementById("carrito-contenedor")
let vaciarCarrito = document.getElementById("vaciar-carrito");


document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    mostrarCarrito();
})


stockProducts.forEach(element => {

        const {id, name, quantity, desc, price, img} = element;
        contenedor.innerHTML += `
        <div class="card my-card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt=${name}>
            <div class="card-body">
            <h5 class="card-title"><a href="#">${name}</a></h5>
            <p class="card-text">${desc}</p>
            <p class="card-text">Precio: $${price}</p>
            <button onclick = "agregarProducto(${id})"class="btn btn-addcarry">AGREGAR AL CARRITO</button>
            </div>
        </div>
        `
    
});

function agregarProducto(id){
    const item = stockProducts.find((product)=>product.id === id)       
    carrito.push(item);
    mostrarCarrito();
    refreshCarritoContenedor();
}

function mostrarCarrito(){
    modal.innerHTML = "";
    carrito.forEach(product => {
        const {id, name, quantity, desc, price, img} = product;
        modal.innerHTML += `
        <div class="card my-card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt=${name}>
            <div class="card-body">
            <h5 class="card-title"><a href="#">${name}</a></h5>
            <p class="card-text">Precio: $${price}</p>
            <p class="card-text">Cantidad: ${quantity}</p>
            <button onclick = "eliminarProducto(${id})"class="btn btn-addcarry">ELIMINAR</button>
            </div>
        </div>
        `
    })
    if(carrito.length === 0){
        modal.innerHTML = `<p>Aun no agregaste productos</p>`
    }
    guardarStorage();
}

function eliminarProducto(id){
    let index = carrito.findIndex((product)=>product.id===id)
    carrito.splice(index, 1);
    mostrarCarrito();
    refreshCarritoContenedor();

}

function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function refreshCarritoContenedor(){
    carritoContenedor.textContent = carrito.length;
}

vaciarCarrito.addEventListener("click", ()=>{
    carrito = [];
    mostrarCarrito();
    refreshCarritoContenedor()

})