//AJAX solution

async function init () {
    try {
        const result = await getCountries({ url: "https://restcountries.eu/rest/v2/all" })
        const countriesByLanguages = getCountryByLanguage(result, $("#langValue").val())
        if (!countriesByLanguages) return
        $("#container-data").text(JSON.stringify(countriesByLanguages))
    } catch (err) {
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

(function () {
    $("#GET_COUNTRIES").on("click", init)



})()

function getCountryByLanguage (countries, language) {
    if (!language) return
    alert(language)


}

// init()