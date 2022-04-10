// These are some of the initial Variables, some are scatter through the script 
// closer to their respective functions for easier reference
const arrivalProfilePic = document.getElementById('arrivalProfilePic')
const arrow = document.getElementsByClassName('arrow')[0]
const arrivalDIV = document.getElementsByClassName('arrivalDIV')[0]
const baseProfile = document.getElementsByClassName('baseProfile')[0]
const carusel_btn = document.getElementById('btn-text')
const fish = document.getElementById('fishGIF')
const lofiMusic = document.getElementById("lofiMusic")
const iframe = document.querySelector('iframe')
const gitLogo = document.getElementById('gitLogo')
const projectGitLogo = document.getElementById('gitLogo2')
const desktopOnly = document.getElementsByClassName('desktopBonus')[0]

// This function allows to enter the site (ie load the page API information)
const enterSite = ()=>{
    // checks screen width to give bonus photo
    if(screen.width<1279){
        arrivalDIV.setAttribute('style', 'display:none')
        baseProfile.setAttribute('style', 'display:block')
        setTimeout(()=>{
            gitLogo.setAttribute('class', 'animate__animated animate__bounce')
            }, 2000)
        setTimeout(()=>{
                projectGitLogo.setAttribute('class', 'animate__animated animate__bounce')
            }, 4000)
    }else{
        arrivalDIV.setAttribute('style', 'display:block')
        baseProfile.setAttribute('style', 'display:block')
        desktopOnly.setAttribute('style', 'display:block')
        setTimeout(()=>{
            gitLogo.setAttribute('class', 'animate__animated animate__bounce')
            }, 2000)
        setTimeout(()=>{
                projectGitLogo.setAttribute('class', 'animate__animated animate__bounce')
            }, 4000)
    }
    arrivalDIV.setAttribute('style', 'display:none')
    baseProfile.setAttribute('style', 'display:block')
    setTimeout(()=>{
        gitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 2000)
    setTimeout(()=>{
            projectGitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 4000)
    
}
// if the user hasn't clicked the img, enter the site
setTimeout(() => {
    enterSite()
}, 3000);

// Click the img to load the next phase
arrivalProfilePic.addEventListener('click', ()=>{
    enterSite()
});


// Accordion fix (This allows the accordion flap to show #unsure why it didn't work natively)
const showHideFlap = (e)=>{
    const flap = document.getElementById('collapseOne')
    const flapBTN = document.getElementById('btn-text')
    // if the flap is hidden show
    if(flap.getAttribute('class') === 'collapse hide'){
        flap.setAttribute('class', 'collapse show')
        flapBTN.textContent='Close'
    }
    // if the flap is showing hide it
    else{
        flap.setAttribute('class', 'collapse hide')
        flapBTN.textContent='Load More'
        
    }
} 
// This trigers the flap to open or close based on conditions
carusel_btn.addEventListener('click', (e)=>{
    showHideFlap()
})


// Fish GIF (Easter Egg)
const lofi = (e)=>{
    // if the video is silent and on autoplay -> allow volume
    if(lofiMusic.getAttribute('src') === "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1"){
        lofiMusic.setAttribute('src', 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0')
    }
    // if the video is playing -> silence it
    else{
        lofiMusic.setAttribute('src', 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1')
    }
}
// listen for click on the fish
fish.addEventListener('click', (e)=>{lofi() }) 

// This promise pulls Public IP to deliver the weather using the city location of the Public IP
const mainPromise = new Promise((resolve, reject)=>{
        // this is the JQuery Function - ensure the Jquery CDN is loaded, npm Zepto is installed and npm ua-parser-js
        $.get("https://ipinfo.io?token=dee75a3cf2a745", function(response) { 
            console.log(response)
            if(response){
                // The response is a JSON object
                resolve(response)
            }else{
                // if the API fails to get the Public IP than set the default to Seattle
                reject("Seattle")
            }
        }, "json")
    })
    
    // Promise resolution
    mainPromise
    //the promise was succesful therefor we initiate the Weather API pulling
    .then((message)=>{
        // this parses the response since its a object
        let city = message.city
        // this is the constructed API URL that's being fetch with the response.city
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1addeadcdb16b6bb6dffad21b497301`
        
        //DOM elements to pass the weather info (for today()) 
        let thisDay = document.getElementById('Day');
        let thisIMG = document.getElementById('weatherIMG')
        let thisTemp = document.getElementById('temp')
        let thisComment = document.getElementById('mainComment')
        let userLocation = document.getElementById('user_location')
        userLocation.textContent = message.city

        // fetch the url with the new param with the resolver promise
        fetch(url)
        .then(res=>res.json())
        .then(json=>{
            const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let day = new Date()
            // the response of the API 
            thisDay.textContent = weekDays[day.getDay()]
                thisIMG.setAttribute('src', json.weather[0].icon)
                thisTemp.textContent = `
                ${((json.main.temp - 273.15)*(9/5)+32).toFixed(2)}°F
                ${((json.main.temp - 273.15)).toFixed(2)}°C `
                thisComment.textContent = json.weather[0].description
                let current_temp = ((json.main.temp - 273.15)*(9/5)+32).toFixed(2)
                console.log(json)
            })
        })
        // if the promise rejects then set the default to Seattle
    .catch((message)=>{
            let city = message
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1addeadcdb16b6bb6dffad21b497301`
            console.log(url)
            fetch(url)
            .then(res=>res.json())
            .then(json=>{
            const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let day = new Date()
            // the response of the API  if the promise rejects
            thisDay.textContent = weekDays[day.getDay()]
                thisIMG.setAttribute('src', json.weather[0].icon)
                thisTemp.textContent = `
                ${((json.main.temp - 273.15)*(9/5)+32).toFixed(2)}°F
                ${((json.main.temp - 273.15)).toFixed(2)}°C `
                thisComment.textContent = json.weather[0].description
                let current_temp = ((json.main.temp - 273.15)*(9/5)+32).toFixed(2)
                console.log(json)
            })
})

// Local Storage Creation

const localStoragePromise = new Promise((resolve, reject)=>{
    // pulls the user info from api
    $.get("https://ipinfo.io", function(response) { 
            if(response){
                resolve(response)
            }else{
                reject("Unknown")
            }
        }, "json")
    })
// the localStoragePromise has resolve and it will set the (key, val) onto the local memory
localStoragePromise.then((message)=>{
    // pasrsing the promise to store it
    let request_ip = message.ip
    let request_city = message.city
    let request_region = message.region
    let request_country = message.country
    let request_timezone = message.timezone
    // This ensures the userAgent is current and begin to parse to store it
    $.ua.set(navigator.userAgent)
    let request_ua = $.ua.get()
    let request_browser = $.ua.browser.name
    let request_os = $.ua.os.name
    let request_device;
    // desktop fix, this allows to make a predetarmine param of 'Desktop' if the $.ua.devie.type is undefined
    if(typeof $.ua.device.type === 'undefined'){
        request_device = 'Desktop'
    }else{
        // the param has a value 
        request_device = `${$.ua.device.type} ${$.ua.device.vendor} ${$.ua.device.model}`
    }
    // begin to store it all
    localStorage.setItem('user_ip', `${request_ip}`)
    localStorage.setItem('user_city', `${request_city}`)
    localStorage.setItem('user_region', `${request_region}`)
    localStorage.setItem('user_country', `${request_country}`)
    localStorage.setItem('user_timezone', `${request_timezone}`)
    localStorage.setItem('user_ua', `${request_ua}`)
    localStorage.setItem('user_browser', `${request_browser}`)
    localStorage.setItem('user_os', `${request_os}`)
    localStorage.setItem('user_device', `${request_device}`)

})

// Art Institute of Chicago API src = https://api.artic.edu/docs/#introduction

// Dom elements in which the fetch result will get passed
const chi1 = document.getElementById('chiArt_1')
const chi1Text = document.getElementById('chiArt_1_text')
fetch('https://api.artic.edu/api/v1/artworks/34181?fields=id,title,image_id')
    .then(res=>res.json())
    .then(json=>{
        // creating the img src url
        let this_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`

        // Passing the information unto the DOM
        chi1.setAttribute('src', this_url)
        chi1Text.textContent = `${json.data.title} - René Magritte (1938)`
        })

// img2 DOM elements 
const chi2 = document.getElementById('chiArt_2')
const chi2Text = document.getElementById('chiArt_2_text')

// second fetch (for the future try multiple fetched per fetch to keep code more DRY)
fetch('https://api.artic.edu/api/v1/artworks/79600?fields=id,title,image_id')
.then(res=>res.json())
.then(json=>{
    // setting img src url
    let this_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`
    
    //passing the values unto the DOM
    chi2.setAttribute('src', this_url)
    chi2Text.textContent = `${json.data.title} - Fernand Léger (1919)`
})


// Prevent user from rotating the screen
window.addEventListener('orientationchange', function() {
        if(window.orientation == 90 || window.orientation == -90) {
            if(this.window.screen.width<1024){
                alert('Please rotate your device to portrait mode for best experience.');
                this.location.reload()
        }
    }
});