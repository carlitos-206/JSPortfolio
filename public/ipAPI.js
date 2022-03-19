// free teir limit 1500request/hr 
const API_KEY = 'aff92720-a77a-11ec-a8aa-517b7e52d787'

const request = require(['request-promise'], ()=>{

    request('https://api.freegeoip.app/json/8.8.8.8?apikey=aff92720-a77a-11ec-a8aa-517b7e52d787')
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
});
