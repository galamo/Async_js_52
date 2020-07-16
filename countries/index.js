//AJAX solution

async function init () {
    try {
        const result = await getCountries({ url: "https://restcountries.eu/rest/v2/all" })
        $("#container-data").text(JSON.stringify(result))
    } catch (err) {
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

(function () {
    $("#GET_COUNTRIES").on("click", init)
})()

// init()