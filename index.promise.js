

function getProductsFromServer () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (products.length === 0) reject()
            resolve(products)
        }, 2000)
    })
}


function searchProductsFromServer (name) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("in server....")
            const result = products.filter(p => p.item === name)
            if (!result.length) rej(`no result for the relevant search ${name}`)
            res(result)
        }, 1000)
    })

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
        console.log("search start")
        console.log("loader start")
        container.html(loader)
        //resolve =>>> then
        // reject =>>> catch

        searchProductsFromServer(searchValue.val()).then((productssssssss) => {
            draw(productssssssss)
        }).catch((err) => {
            alert(err)
            container.empty()
        })


        console.log("search end")
    })

    getProductsFromServer().then((products) => { draw(products) })




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