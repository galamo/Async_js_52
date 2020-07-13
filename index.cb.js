

function getProductsFromServer (callback) {
    setTimeout(() => {
        callback(products)
    }, 5000)
}

// function () { ================ callback
// } ================ callback

function init () {
    const container = $("#productsContainer")
    getProductsFromServer(function (products) {
        const listItems = products.map((product) => {
            return getListItem(product)
        })
        container.append(...listItems)
    })

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