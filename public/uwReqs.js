const arrivalProfilePic = document.getElementById('arrivalProfilePic')
const arrow = document.getElementsByClassName('arrow')[0]
const arrivalDIV = document.getElementsByClassName('arrivalDIV')[0]
const baseProfile = document.getElementsByClassName('baseProfile')[0]
const carusel_btn = document.getElementById('btn-text')

// This function checks the screen dimensions
const screenSettting = ()=>{
    // if the screen is the less than 1024px Don't allow access
    if(screen.width<1024){
        alert("Please Use a Desktop to view this site. Mobile Version under Development")
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

var ip = require('ip');

console.log(ip.address());
