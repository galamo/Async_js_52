


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
    btn.addEventListener("click", _drawBorders)
    const containerBorders = document.createElement("DIV")
    containerBorders.setAttribute("data-t-name", country.name)
    container.append(...elementsArray, btn, containerBorders)
    div.append(container)
    return div

    function getSingleBorder () {

    }

    async function _drawBorders () {
        //  this  === BUTTON
        console.log(containerBorders)
        const { borders } = country
        console.log(borders)
        if (!Array.isArray(borders)) return
        // fetch one by one
        // for (let index = 0; index < borders.length; index++) {
        //     const alpha3Code = borders[ index ]
        //     const result = await getAPI({ url: `https://restcountries.eu/rest/v2/alpha/${alpha3Code}` })
        //     await new Promise(r => setTimeout(r, 1000))
        //     console.log(result.flag, index)
        //     const flag = document.createElement("img")
        //     flag.src = result.flag
        //     flag.style.height = "100px"
        //     flag.style.width = "100px"
        //     containerBorders.append(flag)
        // }


        const bordersFlags = borders.map(async (alpha3Code, index) => {
            console.log("start", index)
            const result = await getAPI({ url: `https://restcountries.eu/rest/v2/alpha/${alpha3Code}` })
            console.log("end", index)
            const flag = document.createElement("img")
            flag.src = result.flag
            flag.style.height = "100px"
            flag.style.width = "100px"
            containerBorders.append(flag)
            return result.flag
        })

        // Promise.all(bordersFlags).then(flags => {
        //     const flagsImages = flags.map(flag => {
        //         const flagImg = document.createElement("img")
        //         flagImg.src = flag
        //         flagImg.style.height = "100px"
        //         flagImg.style.width = "100px"
        //         flagImg.style.border = "1px solid black"
        //         return flagImg
        //     })
        //     const between = document.createElement("h3")
        //     between.innerHTML = "====================="
        //     containerBorders.append(between)
        //     containerBorders.append(...flagsImages)
        // })
        // console.log(bordersFlags)
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
