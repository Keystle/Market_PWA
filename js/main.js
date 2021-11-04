/* ------------------------------------------------------ */
/*                  VARIABLES GLOBALES                    */
/* ------------------------------------------------------ */

let productList = [
    { name: 'Bistec', quantity: 2, price: 12.34 },
    { name: 'Bread', quantity: 3, price: 34.56 },
    { name: 'Pasta', quantity: 4, price: 56.78 },
    { name: 'Milk', quantity: 5, price: 78.90 },
]


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

async function renderList() {

    let data = await fetch('template-list.hbs')
    let template = await data.text()

    var templates = Handlebars.compile(template)
    $('#lista').html(templates({ productList : productList }))

    let ul = $("#list-container")
    componentHandler.upgradeElements(ul)
    
}

function configListeners() {

    $("#btn-product-input").click(() => {
        console.log("btn-product-input")

        let input = $("#enter-product")
        let product = input.val()
        console.log(product)

        if (product) {
            productList.push({ name: product, quantity: 1, price: 0 })
            renderList()
            input.val(null)
        }
    })

    $("#btn-delete-product").click(() => {
        console.log("btn-delete-product")

        if (productList.length) {
            var dialog = $("dialog")[0];
            dialog.showModal();
        }
        /* if (confirm("Do you want to delete all products?")) {
            productList = []
            renderList()
        } */
    })

}

function initDialog() {
    var dialog = $("dialog")[0];
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $("dialog .agree").click(() => {
        productList = []
        renderList()
        dialog.close();
    });

    $("dialog .close").click(() => {
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

/* window.onload = start */
$(document).ready(start)