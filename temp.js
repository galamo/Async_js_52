


// mapping object
// key present the mapped object
// value present the server response object path 


const mapping = {
    name: { path: "name", isVisible: true },
    DE: { path: "translations.de", isVisible: true },
    BR: { path: "translations.br", isVisible: true },
    JA: { path: "translations.ja", isVisible: true },
    lat: { path: "latlng.0", isVisible: true },
    lng: { path: "latlng.1", isVisible: true },
    borders: { fn: getBorders, isVisible: true }
}

function getBorders (country) {
    const { borders } = country
    if (!borders) return
    return borders.join(",")
}

async function init () {
    try {
        const response = await getCOuntries({
            url: "https://restcountries.eu/rest/v2/all"
        })

        console.log(response) // DRAW HERE
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
    const div = document.createElement("DIV")
    const btn = document.createElement("BUTTON")
    const container = document.createElement("DIV")
    const h1 = document.createElement("H1")
    const h3 = document.createElement("H4")

    btn.classList.add("btn", "btn-primary")
    div.classList.add("card", "col-lg-2")
    container.classList.add("container")
    container.id = "container-borders"
    h3.innerHTML = country.borders
    btn.innerHTML = "Get Borders"
    btn.addEventListener("click", _getBorders)
    h1.innerHTML = country.name
    container.append(h1, btn, h3)
    div.append(container)
    return div


    async function _getBorders () {
        const container = this.parentElement.parentElement.querySelector("#container-borders")
        const res = getBordersFromServer(country.borders)
        const h5 = document.createElement("h5")
        console.log("res", res)
        h5.innerHTML = res.join(";")
        container.append(h5)
    }
}

function getBordersFromServer (arr) {
    if (!arr) return
    const result = arr.split(",").map(async (c) => {
        const country = await getCOuntries({ url: "https://restcountries.eu/rest/v2/alpha/" + c })
        console.log(country.flag)
        return country.flag
    })
    return result
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
