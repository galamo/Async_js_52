// function getCountries (params) {
//     const { url, method = "GET" } = params
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url,
//             method,
//             success: function (data) {
//                 resolve(data)
//             },
//             error: function (err) {
//                 reject("error", err)
//             }
//         })
//     })
// }

function getCountries (params) {
    const { url, method = "GET" } = params
    return $.ajax({
        url,
        method,
    })
}