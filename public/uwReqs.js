const arrivalProfilePic = document.getElementById('arrivalProfilePic')
const arrow = document.getElementsByClassName('arrow')[0]
const arrivalDIV = document.getElementsByClassName('arrivalDIV')[0]
const baseProfile = document.getElementsByClassName('baseProfile')[0]
const carusel_btn = document.getElementById('btn-text')

// This function checks the screen dimensions
const screenSettting = ()=>{
    // if the screen is the less than 1024px Don't allow access
    if(screen.width<1920){
        alert(`
        Your Screen is ${screen.width}px wide and ${screen.height}px height.
        This site is best viewed on a 1920px wide and 1080px height.
        Please resize your screen to view this site.
                or
        Click OK to continue.
        
        Other screens will be supported in the future.`)
        arrow.setAttribute('style', 'display: none')
        arrivalDIV.setAttribute('style', 'display:none')
        baseProfile.setAttribute('style', 'display:block')

    }else{
        
        // the screen is a desktop size, loads .baseProfile and removes .arrivalDiv
        
        // edgecase if the timer overturns arrow
        arrow.setAttribute('style', 'display: none')
        arrivalDIV.setAttribute('style', 'display:none')
        baseProfile.setAttribute('style', 'display:block')
    }
}
// if the user hasn't clicked the img then display an arrow
setTimeout(() => {
    arrow.setAttribute('style', 'display: block')
}, 5000);

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



// these two functions a JQuery Dependent they require the CDN to be loaded before the 
// the script excecutes ... both functions serve the same pourpose but its one fail safe if
// one service doesnt work
//src = https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/

//function 1  
$.getJSON("https://api.ipify.org?format=json", function(data) {
    console.log('function 1: ',data.ip, data)})

// function 2 <-- Fastest
$.get("https://ipinfo.io", function(response) {
    let ip2 = response.ip
   console.log('function 2: ', ip2, response)
}, "json")



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