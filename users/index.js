


// mapping object
// key present the mapped object
// value present the server response object path 


const mapping = {
    firstName: { path: "name.first", isVisible: true },
    lastName: { path: "name.last", isVisible: true },
    city: { path: "location.city", isVisible: true },
    address: { path: "location.street.name", isVisible: true },
    src: { path: "picture.large", isVisible: true },
}


async function init () {
    try {
        const response = await getUsersFetch({ url: "https://randomuser.me/api/?results=10" })
        const { results } = response
        console.log(results) // DRAW HERE
        draw(results)
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

function draw (arrOfObjects) {



    const mappedUsers = arrOfObjects.map((user) => {
        return getMappedUser(user)
    })

    console.log(mappedUsers)
    //DRAW
}

function getMappedUser (user) {
    const keyValueMappingArray = Object.entries(mapping)
    return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
        const [ key, settingObj ] = KEYVALUEPAIR_ARRAY
        const { path } = settingObj
        return { ...mappedUser, [ key ]: getValueFromPath(path, user) }
    }, {})
}

function getValueFromPath (path, user) {
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