

function getProductsFromServer () {
    return products
}


function init () {
    const container = $("#productsContainer")
    const products = getProductsFromServer()

    const listItems = products.map((p) => {
        return getListItem(p)
    })
    container.append(...listItems)
    function getListItem (productData) {
        const { item, price } = productData
        const listItem = document.createElement("li")
        listItem.classList.add("list-group-item")
        listItem.innerText = `${item}, ${price}`
        return listItem
    }

}
init()



