//AJAX solution

async function init () {
    try {
        const result = await getCountries({ url: "https://restcountries.eu/rest/v2/all" })
        const countriesByLanguages = getCountryByLanguage(result, $("#langValue").val())
        $("#container-data").text(JSON.stringify(result))
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
    const requestedLanguage = language.toLowerCase()
    const result = countries.map(country => country.languages)

    const final = countries.reduce((countryObj, country) => {
        const { languages } = country
        const languagesNames = languages.map(languageObj => languageObj.name)
        const isLanguageExistInCountry = languagesNames.some(langString => langString.toLowerCase().includes(requestedLanguage))
        if (isLanguageExistInCountry) {
            return { ...countryObj, [ country.name ]: country }
        } else {
            return { ...countryObj }
        }
    }, {})

    console.log(final)
}

// init()