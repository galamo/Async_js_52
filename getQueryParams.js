const testString = "file:///C:/Users/Jbt/Desktop/proj13072020/Async/b.html?username=gal&password=12243&i_am_not_a_robot=no"

function getQueryParams (url) {
    if (typeof url !== 'string') return
    const [ _, stringQueryParams ] = url.split("?")
    if (typeof stringQueryParams !== 'string') return
    const arrayOfPairs = stringQueryParams.split("&")

    // const objParams = {}
    // for (let index = 0; index < arrayOfPairs.length; index++) {
    //     const pair = arrayOfPairs[ index ]
    //     const [ key, value ] = pair.split("=")
    //     objParams[ key ] = value

    // }

    const result = arrayOfPairs.reduce((objOfParams, pair) => {
        const [ key, value ] = pair.split("=")
        return { ...objOfParams, [ key ]: value }
    }, {})

    return result

    // return objParams
}

const users = [ { name: "gal", salary: 10 }, { name: "stoler", salary: 20 }, { name: "vidal", salary: 30 } ]

const sumAllSalaries = users.reduce((sumSalaray, user) => {

    const newSalary = sumSalaray + user.salary
    return newSalary
}, 0)


const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('myParam')
