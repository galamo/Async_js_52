

function getProductsFromServer (callback) {
    setTimeout(() => {
        callback(products)
    }, 2000)
}

function searchProductsFromServer (callback, name) {
    setTimeout(() => {
        callback(products.filter(p => p.item === name))
    }, 2000)
}

// function () { ================ callback
// } ================ callback

function init () {
    const loader = $('<div class="loader"></div>')

    const searchValue = $("#searchValue")
    const searchOperation = $("#searchOperation")
    const container = $("#productsContainer")
    container.html(loader)

    searchOperation.on("click", function () {
        container.html(loader)
        searchProductsFromServer(function (products) {
            draw(products)
        }, searchValue.val())
    })



    getProductsFromServer(function (products) {
        draw(products)
    })

    function draw (products) {
        container.empty()
        const listItems = products.map((product) => {
            return getListItem(product)
        })
        container.append(...listItems)
    }

    function getListItem (productData) {
        const { item, price } = productData
        const listItem = document.createElement("li") //use jquery
        listItem.classList.add("list-group-item")
        listItem.innerText = `${item}, ${price}`
        return listItem
    }

}
init()



// function hi (param) {
//     param()
// }

// hi(() => {
//     console.log("i am smart")
// })









// const a = function (products) {
//     const listItems = products.map((p) => {
//         return getListItem(p)
//     })
//     container.append(...listItems)
// }

// a()