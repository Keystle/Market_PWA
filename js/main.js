/* ------------------------------------------------------ */
/*                  VARIABLES GLOBALES                    */
/* ------------------------------------------------------ */

let productList = [
    { name: 'Bistec', quantity: 2, price: 12.34 },
    { name: 'Bread', quantity: 3, price: 34.56 },
    { name: 'Pasta', quantity: 4, price: 56.78 },
    { name: 'Milk', quantity: 5, price: 78.90 },
]

let createList = true

let ul

/* ------------------------------------------------------ */
/*                  BOTÓN DE DIALOGO                      */
/* ------------------------------------------------------ */



/* ------------------------------------------------------ */
/*                  FUNCIONES GLOBALES                    */
/* ------------------------------------------------------ */

function deleteProduct(index) {
    console.log(`deleteProduct ${index}`)

    productList.splice(index, 1)

    renderList()
}

/* function changeQuantity(index, el) {
    let quantity = parseInt(el.value)
    console.log("changeQuantity", index, quantity)
    productList[index].quantity = quantity
}

function changePrice(index, el) {
    let price = parseFloat(el.value)
    console.log("changePrice", index, price)
    productList[index].price = price
} */

function changeValue(type, index, el) {
    let value = el.value
    value == type == "price" ? Number(value) : parseInt(value)
    /* console.log("changeValue", type, index, value) */
    productList[index][type] = value

}

function renderList() {

    if (createList) {
        ul = document.createElement('ul')

        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }

    ul.innerHTML = ""
    productList.forEach((prod, index) => {

        // console.log(index, prod)
        ul.innerHTML +=
            `
            <li class="mdl-list__item">
                <!-- Icon -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">lunch_dining</i>
                </span>
                <!-- Name -->
                <span class="mdl-list__item-primary-content w-30"> ${prod.name} </span>
                <!-- Quantity -->
                <span class="mdl-list__item-primary-content w-20">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="changeValue('quantity', ${index}, this)" value="${prod.quantity}" class="mdl-textfield__input" type="text" id="sample-quantity-${index}" />
                        <label class="mdl-textfield__label" for="sample-quantity-${index}">Quantity</label>
                    </div>
                </span>
                <!-- Price -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="changeValue('price', ${index}, this)" value="${prod.price}"class="mdl-textfield__input" type="text" id="sample-price-${index}" />
                        <label class="mdl-textfield__label" for="sample-price-${index}">Price ($)</label>
                    </div>
                </span>
                <!-- Delete -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Accent-colored raised button with ripple -->
                    <button onclick="deleteProduct(${index})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>
            </li>
            `
    })
    if (createList) {
        document.getElementById('lista').appendChild(ul)

    }
    else {
        componentHandler.upgradeElements(ul)
    }

    createList = false
}

function configListeners() {

    document.getElementById("btn-product-input").addEventListener("click", () => {
        console.log("btn-product-input")

        let input = document.getElementById("enter-product")
        let product = input.value
        console.log(product)

        if (product) {
            productList.push({ name: product, quantity: 1, price: 0 })
            renderList()
            input.value = null
        }
    })

    document.getElementById("btn-delete-product").addEventListener("click", () => {
        console.log("btn-delete-product")

        if (productList.length) {
            var dialog = document.querySelector("dialog");
            dialog.showModal();
        }
        /* if (confirm("Do you want to delete all products?")) {
            productList = []
            renderList()
        } */
    })

}

function initDialog() {
    var dialog = document.querySelector("dialog");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    dialog.querySelector(".agree").addEventListener("click", function () {
        productList = []
        renderList()
        dialog.close();
    });

    dialog.querySelector(".close").addEventListener("click", function () {
        dialog.close();
    });
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        //window.addEventListener("load", () => {
        this.navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                // console.log("The service worker was successfully registered", reg)
            })
            .catch(err => {
                // console.error("error registering service worker", err)
            })
        //})
    }
    else {
        console.error("serviceWorker not available")
    }
}

function start() {
    /* console.log(document.querySelector('title').textContent) */

    initDialog()
    registerServiceWorker()
    configListeners()
    renderList()
}
/* ------------------------------------------------------ */
/*                      EJECUCIÓN                         */
/* ------------------------------------------------------ */

window.onload = start
