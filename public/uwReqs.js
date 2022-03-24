
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
// This function checks the screen dimensions
const screenSettting = ()=>{
    // if the screen is the less than 1024px Don't allow access
    if(screen.width < 1024){
        alert(`
        Please view this on a Desktop
        Mobile screens will be supported in the future`)
    }
    if(screen.width<1920){
        alert(`
        Your Screen is ${screen.width}px wide and ${screen.height}px height.
        This site is best viewed on a 1920px wide and 1080px height.
        Please resize your screen to view this site.
            1920px wide and 930px height using DevTools.
                or
        Click OK to continue (just don't mind the poor UI).
        
        Other screens will be supported in the future.`)
        arrow.setAttribute('style', 'display: none')
        arrivalDIV.setAttribute('style', 'display:none')
        baseProfile.setAttribute('style', 'display:block')
        setTimeout(()=>{
            gitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 2000)
        setTimeout(()=>{
            projectGitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 4000)
    }else{
        
        // the screen is a desktop size, loads .baseProfile and removes .arrivalDiv
        
        // edgecase if the timer overturns arrow
        arrow.setAttribute('style', 'display: none')
        arrivalDIV.setAttribute('style', 'display:none')
        baseProfile.setAttribute('style', 'display:block')
        setTimeout(()=>{
            gitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 2000)
        setTimeout(()=>{
            projectGitLogo.setAttribute('class', 'animate__animated animate__bounce')
        }, 4000)
    }
}
// if the user hasn't clicked the img then display an arrow
setTimeout(() => {
    arrow.setAttribute('style', 'display: block')
}, 2000);

// Click the img to load the next phase
arrivalProfilePic.addEventListener('click', ()=>{
    screenSettting()
});


// Accordion fix
const showHideFlap = (e)=>{
    // e.preventDefault()
    const flap = document.getElementById('collapseOne')
    const flapBTN = document.getElementById('btn-text')
    if(flap.getAttribute('class') === 'collapse hide'){
        flap.setAttribute('class', 'collapse show')
        flapBTN.textContent='Close'
    }else{
        flap.setAttribute('class', 'collapse hide')
        flapBTN.textContent='Load More'

    }
} 

carusel_btn.addEventListener('click', (e)=>{
    showHideFlap()
})


// Click Fish GIF for lofi music (Easter Egg)

const lofi = (e)=>{
    if(lofiMusic.getAttribute('src') === "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1"){
        lofiMusic.setAttribute('src', 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0')
    }else{
        lofiMusic.setAttribute('src', 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1')
    }
}
fish.addEventListener('click', (e)=>{lofi() }) 



// // these two functions a JQuery Dependent they require the CDN to be loaded before the 
// // the script excecutes ... both functions serve the same pourpose but its one fail safe if
// // one service doesnt work
// //src = https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/

//function 1  
$.getJSON("https://api.ipify.org?format=json", function(data) {
    console.log(data)})

const mainPromise = new Promise((resolve, reject)=>{
        $.get("https://ipinfo.io", function(response) { 
            if(response){
                resolve(response)
            }else{
                reject("Seattle")
            }
        }, "json")
    })
mainPromise
    .then((message)=>{
        hellTest = message
        let city = message.city
        let url = `https://weatherdbi.herokuapp.com/data/weather/${city}`
        let thisDay = document.getElementById('Day');
        let thisIMG = document.getElementById('weatherIMG')
        let thisTemp = document.getElementById('temp')
        let thisComment = document.getElementById('mainComment')
        let tomorrow = document.getElementById('2moro');
        let tomorrowIMG = document.getElementById('2moroWeatherIMG')
        let tomorrowTemp = document.getElementById('2moroTemp')
        let tomorrowComment = document.getElementById('2moroMainComment')
        let locationWeather = document.getElementById('locationWeather')
        console.log(url)
        fetch(url)
            .then(res=>res.json())
            .then(json=>{
                thisDay.textContent = `Today: ${json.next_days[0].day}`
                thisIMG.setAttribute('src', json.next_days[0].iconURL)
                thisTemp.textContent = `${json.next_days[0].max_temp.f}F / ${json.next_days[0].max_temp.c}C `
                thisComment.textContent = json.next_days[0].comment
                tomorrow.textContent = `Tomorrow: ${json.next_days[1].day}`
                tomorrowIMG.setAttribute('src', json.next_days[1].iconURL)
                tomorrowTemp.textContent = `${json.next_days[1].max_temp.f}F / ${json.next_days[0].max_temp.c}C `
                tomorrowComment.textContent = json.next_days[1].comment
                locationWeather.textContent = `location: ${message.city}`
            })
        })
    .catch((message)=>{
            let city = message
            let url = `https://weatherdbi.herokuapp.com/data/weather/${city}`
            console.log(url)
            fetch(url)
            .then(res=>res.json())
            .then(json=>{
                thisDay.textContent = `Today: ${json.next_days[0].day}`
                thisIMG.setAttribute('src', json.next_days[0].iconURL)
                thisTemp.textContent = `${json.next_days[0].max_temp.f}F / ${json.next_days[0].max_temp.c}C `
                thisComment.textContent = json.next_days[0].comment
                tomorrow.textContent = `Tomorrow: ${json.next_days[1].day}`
                tomorrowIMG.setAttribute('src', json.next_days[1].iconURL)
                tomorrowTemp.textContent = `${json.next_days[1].max_temp.f}F / ${json.next_days[0].max_temp.c}C `
                tomorrowComment.textContent = json.next_days[1].comment
                locationWeather.textContent = `Default City: ${message.city}`
            })
})


// Local Storage Creation

class RequestInfo {
    constructor(ip, city, region, postal, country, timezone, location){
        this.ip = ip
        this.city= city
        this.region = region
        this.postal = postal
        this.country = country
        this.timezone = timezone
        this.location = location
    }
}

class uaInfo extends RequestInfo{
    constructor(ip, city, region, postal, country, timezone, location, userAgent, ua, browser, os, device){
        super(ip, city, region, postal, country, timezone, location)
        this.userAgent = userAgent
        this.ua = ua
        this.browser = browser
        this.os = os
        this.device = device
    }
}

$.ua.set(navigator.userAgent)
console.log('test', $.ua.os);   
console.log(navigator.userAgent)



// Time TransfixedDate:
// 1938


const chi1 = document.getElementById('chiArt_1')
const chi1Text = document.getElementById('chiArt_1_text')

// Artist:
// René Magritte
// Belgian, 1898–1967
fetch('https://api.artic.edu/api/v1/artworks/34181?fields=id,title,image_id')
    .then(res=>res.json())
    .then(json=>{
        let this_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`
        chi1.setAttribute('src', this_url)
        chi1Text.textContent = `${json.data.title} - René Magritte (1938)`
        })

const chi2 = document.getElementById('chiArt_2')
const chi2Text = document.getElementById('chiArt_2_text')
fetch('https://api.artic.edu/api/v1/artworks/79600?fields=id,title,image_id')
    .then(res=>res.json())
    .then(json=>{
        let this_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`
        chi2.setAttribute('src', this_url)
        chi2Text.textContent = `${json.data.title} - Fernand Léger (1919)`
    })