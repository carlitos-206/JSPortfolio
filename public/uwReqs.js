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
const screenSetting = ()=>{
    // if the screen is the less than 1024px Don't allow access
    if(screen.width < 1024){
        alert(`
        Please view this on a Desktop
        Mobile screens will be supported in the future`)
        return false
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
        return true
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
        return true
    }
}
// if the user hasn't clicked the img then display an arrow
setTimeout(() => {
    arrow.setAttribute('style', 'display: block')
}, 2000);

// Click the img to load the next phase
arrivalProfilePic.addEventListener('click', ()=>{
    screenSetting()
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
// $.getJSON("https://api.ipify.org?format=json", function(data) {
//     console.log(data)})

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
                locationWeather.textContent = `${message.city}`
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

const localStoragePromise = new Promise((resolve, reject)=>{
    $.get("https://ipinfo.io", function(response) { 
            if(response){
                resolve(response)
            }else{
                reject("Unknown")
            }
        }, "json")
    })
localStoragePromise.then((message)=>{
    let request_ip = message.ip
    let request_city = message.city
    let request_region = message.region
    let request_country = message.country
    let request_timezone = message.timezone
    // This ensures the userAgent is current
    $.ua.set(navigator.userAgent)
    let request_ua = $.ua.get()
    let request_browser = $.ua.browser.name
    let request_os = $.ua.os.name
    let request_device;
    if(typeof $.ua.device.type === 'undefined'){
        request_device = 'Desktop'
    }else{
        request_device = `${$.ua.device.type} ${$.ua.device.vendor} ${$.ua.device.model}`
    }
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

// Art Institute of Chicago API
const chi1 = document.getElementById('chiArt_1')
const chi1Text = document.getElementById('chiArt_1_text')
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


// form
const formOpener = document.getElementById('dmOpener')
const formDiv = document.getElementById('mainForm')
const formCloser = document.getElementById('closeForm')


// event listeners

// open form
formOpener.addEventListener('click',()=>{
    formDiv.setAttribute('style', 'display:block')
})

// close/cancel form and reset
formCloser.addEventListener('click', ()=>{
    document.getElementById('theForm').reset()
    formDiv.setAttribute('style', 'display:none')
})
// email info
class RequestInfo {
    constructor(ip, city, region, country, timezone){
        this.ip = ip
        this.city= city
        this.region = region
        this.country = country
        this.timezone = timezone
    }
}
// user agent info
class UserAgent {
    constructor(ua , browser, os, device){
        this.ua = ua
        this.browser = browser
        this.os = os
        this.device = device
    }
}

const emailUserInfoPromise = ()=>{
    return new Promise((resolve, reject)=>{
        $.get("https://ipinfo.io", function(response) {
            if(response){
                let request_city = response.city
                let request_ip = response.ip
                let request_region = response.region
                let request_country = response.country
                let request_timezone = response.timezone
                resolve(new RequestInfo(request_ip, request_city, request_region, request_country, request_timezone))
            }else{
                reject("Unknown")
            }
        }, "json")
    })
}
const emailUAPromise = ()=>{
    return new Promise((resolve, reject)=>{
        $.ua.set(navigator.userAgent)
        let request_ua = $.ua.get()
        let request_browser = $.ua.browser.name
        let request_os = $.ua.os.name
        let request_device;
        if(typeof $.ua.device.type === 'undefined'){
            resolve(new UserAgent(request_ua, request_browser, request_os, 'Desktop'))
        }else{
            resolve(new UserAgent(request_ua, request_browser, request_os, `${$.ua.device.type} ${$.ua.device.vendor} ${$.ua.device.model}`))
        }
        reject("Unknown")
    })
}






// This event needs to get fired before submit so the flexOptions can show


async function sendEmail(){
    // Wait f()
    let userInfo = await emailUserInfoPromise()
    let userAgent = await emailUAPromise()
    const form = document.forms['emailForm']

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

// this validates ex: www.google.com/test || www.google.com || google.com || https://www.google.com/test || http://www.google.com/test || https://www.google.com || http://www.google.com


let errors = 0

const messageValidation = ()=>{
    if(form['messageField'].value === '' || form['messageField'].value.length<10){
        form['messageField'].validity.valid = false
        form['messageField'].setCustomValidity('Please enter a message')
        form['messageField'].closest('.form-group').classList.remove('valid')
        form['messageField'].closest('.form-group').classList.add('invalid')
        errors+=1
    }
    else{
        form['messageField'].validity.valid = true
        form['messageField'].setCustomValidity('')
        form['messageField'].closest('.form-group').classList.add('valid')
        form['messageField'].closest('.form-group').classList.remove('invalid')
    }
}

const reasonValidation =()=>{
    if(form['reasonField'].value ==""){
        errors+=1
        form['reasonField'].setCustomValidity("Choose a reason for contact")
        form['reasonField'].validity.valid= false
        form['reasonField'].closest('.form-group').classList.remove('valid')
        form['reasonField'].closest('.form-group').classList.add('invalid')
    }else{
        form['reasonField'].setCustomValidity('')
        form['reasonField'].validity.valid = true
        form['reasonField'].closest('.form-group').classList.remove('invalid')
        form['reasonField'].closest('.form-group').classList.add('valid')
    }
}
const emailValidation = ()=>{
    if(!form['email'].value.match(emailRegex)){
        errors+=1
        if(form['email'].value ==""){
            errors+=1
            form['email'].validity.valid = false
            form['email'].setCustomValidity("Enter a email")
            form['email'].closest('.form-group').classList.remove('valid')
            form['email'].closest('.form-group').classList.add('invalid')
        }
        else{
        form['email'].validity.valid = false
        form['email'].setCustomValidity("Enter a valid Email")
        form['email'].closest('.form-group').classList.remove('valid')
        form['email'].closest('.form-group').classList.add('invalid')}
    }else{
        form['email'].validity.valid = true
        form['email'].setCustomValidity('')
        form['email'].closest('.form-group').classList.remove('invalid')
        form['email'].closest('.form-group').classList.add('valid')
    }
}

const lastNameValidation = ()=>{
    if(form['lname'].value.length < 3 || form['lname'].value === ""){
        errors+=1
        form['lname'].setCustomValidity('Name must be at least 3 characters')
        form['lname'].closest('.form-group').classList.remove('valid')
        form['lname'].closest('.form-group').classList.add('invalid')
        form['lname'].validity.valid = false
        form['lname'].reportValidity()
    }else{
        form['lname'].reportValidity()
        form['lname'].validity.valid = true
        form['lname'].setCustomValidity('')
        form['lname'].closest('.form-group').classList.remove('invalid')
        form['lname'].closest('.form-group').classList.add('valid')
    }
}

const firstNameValidation = ()=>{
    if(form['fname'].value.length < 3 || form['fname'].value === ""){
        errors+=1
        form['fname'].setCustomValidity('First Name must be at least 3 characters')
        form['fname'].closest('.form-group').classList.remove('valid')
        form['fname'].closest('.form-group').classList.add('invalid')
        form['fname'].validity.valid = false
        form['fname'].reportValidity()
    }else{
        form['fname'].reportValidity()
        form['fname'].validity.valid = true
        form['fname'].setCustomValidity('')
        form['fname'].closest('.form-group').classList.remove('invalid')
        form['fname'].closest('.form-group').classList.add('valid')
    }
}
// There is a endless loop unsure why but this is the only way to stop it
let alertCounter = 0
function validations(e){
    firstNameValidation();
    lastNameValidation()
    emailValidation();
    reasonValidation();
    messageValidation();
    console.log(errors)
    if(errors === 0){
        if(alertCounter === 0){
            e.preventDefault()
            alert("Check Console for intentions")
            console.log(`
            In Theory I would've sent the fallowing email with a SMTP server ( src = https://smtpjs.com/)

            TO: ME
            From: ${form['email'].value}
            Senders Name: ${form['fname'].value} ${form['lname'].value}
            Subject: ${form['reasonField'].value} opportunity
            Message: ${form['messageField'].value}
            `,
            userAgent, userInfo,
            `
            Review Senders Time Zone for best results`)
            form.reset()
            formDiv.setAttribute('style', 'display:none')
        }   
    }else{
        e.preventDefault()
        errors = 0
        form['submitBTN'].addEventListener('click', (e)=>{validations(e)})
    }
}
    form.addEventListener('submit', (e)=>{validations(e)})
    //FORM 
    // console.log(userInfo, userAgent)

}
sendEmail()
