


// mapping object
// key present the mapped object
// value present the server response object path 


const mapping = {
    name: { path: "name", isVisible: true, el: "h1" },
    DE: { path: "translations.de", isVisible: true, el: "h6" },
    BR: { path: "translations.br", isVisible: true, el: "h6" },
    JA: { path: "translations.ja", isVisible: true, el: "h6" },
    lat: { path: "latlng.0", isVisible: true, el: "h6" },
    lng: { path: "latlng.1", isVisible: true, el: "h6" },
    borders: { fn: getBorders, isVisible: true, el: "h2", cls: "greenMe" },
    currencies: { fn: getCurrencies, isVisible: true, }
}

function getBorders (country) {
    const { borders } = country
    if (!Array.isArray(borders) || !borders.length) return "No Borders"
    return borders
}

function getCurrencies (country) {
    const { currencies } = country
    if (!Array.isArray(currencies)) return
    const [ firstCur ] = currencies.map(c => c.name)
    return firstCur
}

async function init () {
    try {
        const response = await getAPI({
            url: "https://restcountries.eu/rest/v2/all"
        })

        // console.log(response) // DRAW HERE
        draw(response)
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

function draw (arrOfObjects) {
    const mappedCountries = arrOfObjects.map((user) => {
        return getMappedUser(user)
    })


    const cards = mappedCountries.map(item => getCard(item))
    document.querySelector("#container-data").append(...cards)
}

function getCard (country) {

    const elementsArray = Object.entries(mapping).map(([ key, value ]) => {
        const { el = "h1", cls } = value
        const h2 = document.createElement(el)
        if (cls) {
            h2.classList.add(cls)
        }
        h2.innerHTML = country[ key ]
        return h2
    })


    //WE DONT WRITE LIKE THIS
    const div = document.createElement("DIV")
    const btn = document.createElement("BUTTON")
    const container = document.createElement("DIV")
    btn.classList.add("btn", "btn-primary")
    div.classList.add("card", "col-lg-2")
    container.classList.add("container")
    container.id = "container-borders"
    btn.innerHTML = "Get Borders"
    // btn.addEventListener("click", _drawBorders)
    container.append(...elementsArray, btn)
    div.append(container)
    return div


    function _getBorders () {

    }


}



// async function getBordersFromServer (arr) {
//     if (!arr) return
//     const result = arr.split(",").map(async (c) => {
//         const country = await getAjax({ url: "https://restcountries.eu/rest/v2/alpha/" + c })
//         return country.flag
//     })
//     return result
// }




function getMappedUser (user) {
    const keyValueMappingArray = Object.entries(mapping)
    return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
        const [ key, settingObj ] = KEYVALUEPAIR_ARRAY
        const { path } = settingObj
        const isFunction = typeof settingObj[ "fn" ] === 'function'
        return { ...mappedUser, [ key ]: isFunction ? settingObj[ "fn" ](user) : getValueFromPath(path, user) }
    }, {})
}



function getValueFromPath (path, user) {
    if (typeof path !== 'string') return
    const splittedPath = path.split(".")
    const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
        const isValueExist = currentUser[ partOfPath ]
        return isValueExist ? currentUser[ partOfPath ] : "Not Availble"
    }, user)
    return theRequestedValue
}


(function () {
    init()
})()



// init()

// function getMappedUserFn (user) {
//     const keyValueMappingArray = Object.entries(mappingWithFunction)
//     return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
//         const [ key, settingObj ] = KEYVALUEPAIR_ARRAY

//         // console.log(settingObj[ "fn" ])
//         return { ...mappedUser, [ key ]: settingObj[ "fn" ](user) }
//     }, {})
// }
