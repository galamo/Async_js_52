

function getProductsFromServer () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (products.length === 0) reject()
            resolve(products)
        }, 2000)
    })
}


async function getFromServer () {
    const a = await fetch("https://restcountries.eu/rest/v2/all")
    const b = await a.data
    return b
}


function getCountriesFromServer () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
        }).done(function (data) {
            resolve(data)
        })
    })
}

$.ajax({
    url: "https://restcounies.eu/rest/v2/all", success: function (result) {
        console.log(result)
    }, error: function (ex) {
        console.log(111)
    }, finally: function () {
        console.log(112121324311)
    }
})



function searchProductsFromServer (name) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("in server....")
            const result = products.filter(p => p.item === name)
            if (!result.length) rej(`no result for the relevant search ${name}`)
            res(result)
        }, 10000)
    })

}

// function () { ================ callback
// } ================ callback

async function init () {
    const loader = $('<div class="loader"></div>')

    const searchValue = $("#searchValue")
    const searchOperation = $("#searchOperation")
    const container = $("#productsContainer")
    container.html(loader)

    searchOperation.on("click", async function () {
        console.log("search start")
        console.log("loader start")
        container.html(loader)
        //resolve =>>> then
        // reject =>>> catch

        try {
            const result = await searchProductsFromServer(searchValue.val())

            console.log("this is blocked!!!!!!!")
            draw(result)
        } catch (err) {
            alert(err)
            container.empty()
        }
        console.log("search end")
    })

    const result = await getProductsFromServer()
    const countries = await getCountriesFromServer()
    console.log(countries)
    draw(result)






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



// $.ajax({
//     url: "test.html",
//     context: document.body
//   }).done(function() {
//     $( this ).addClass( "done" );
//   });


// async function someFunc(){
//     const result = await fromServer()
//     const result = await fromServer()
//     const result = await fromServer()
//     const result = await fromServer()
//     const result = await fromServer()
// }



// const a = function (products) {
//     const listItems = products.map((p) => {
//         return getListItem(p)
//     })
//     container.append(...listItems)
// }

// a()