



async function init () {
    try {
        const response = await getUsersFetch({ url: "https://randomuser.me/api/?results=10" })
        const { results } = response
        console.log(results)
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

(function () {
    init()
})()



// init()