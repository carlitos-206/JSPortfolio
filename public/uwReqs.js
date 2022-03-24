// This is the main script here will be found 5 of 6 requirements for the completion of the Final for UW Course: PROGRAMMING FOR THE BROWSER WITH JAVASCRIPT REG # 198491

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

// This function checks the screen dimensions
const screenSetting = ()=>{
    // if the screen is the less than 1024px Don't allow access
    if(screen.width < 1024){
        alert(`
        Please view this on a Desktop
        Mobile screens will be supported in the future`)
        return false
    }
    // if the screen is less than 1920 allow access but give warnings
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
    // The screen meets the proper requierements
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



// // these two functions a JQuery Dependent they require the CDN to be loaded before the 
// // the script excecutes ... both functions serve the same pourpose but its one fail safe if
// // one service doesnt work
// //src = https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/

//function 1  #keeping this for reference
// $.getJSON("https://api.ipify.org?format=json", function(data) {
//     console.log(data)})


// let the abusement of JS promise begin

// This promise pulls Public IP to deliver the weather using the city location of the Public IP
const mainPromise = new Promise((resolve, reject)=>{
    // this is the JQuery Function - ensure the Jquery CDN is loaded, npm Zepto is installed and npm ua-parser-js
        $.get("https://ipinfo.io", function(response) { 
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
        let url = `https://weatherdbi.herokuapp.com/data/weather/${city}`
        
        //DOM elements to pass the weather info (for today()) 
        let thisDay = document.getElementById('Day');
        let thisIMG = document.getElementById('weatherIMG')
        let thisTemp = document.getElementById('temp')
        let thisComment = document.getElementById('mainComment')
        //DOM elements to pass the weather info (for tomorrow()) 
        let tomorrow = document.getElementById('2moro');
        let tomorrowIMG = document.getElementById('2moroWeatherIMG')
        let tomorrowTemp = document.getElementById('2moroTemp')
        let tomorrowComment = document.getElementById('2moroMainComment')
        let locationWeather = document.getElementById('locationWeather')
        // fetch the url with the new param with the resolver promise
        fetch(url)
            .then(res=>res.json())
            .then(json=>{
                // the reesponse of the API 
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
        // if the promise rejects then set the default to Seattle
    .catch((message)=>{
            let city = message
            let url = `https://weatherdbi.herokuapp.com/data/weather/${city}`
            console.log(url)
            fetch(url)
            .then(res=>res.json())
            .then(json=>{
                // response with Seattle as a default param
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


// Here begins the form for Email

// DOM elements that open and close the form but DOESN'T SUBMIT or Validate them
const formOpener = document.getElementById('dmOpener')
const formDiv = document.getElementById('mainForm')
const formCloser = document.getElementById('closeForm')


// event listeners (Opening and Closing the Form)

// open form
formOpener.addEventListener('click',()=>{
    formDiv.setAttribute('style', 'display:block')
})

// close/cancel form and reset
formCloser.addEventListener('click', ()=>{
    document.getElementById('theForm').reset()
    formDiv.setAttribute('style', 'display:none')
})
// email info, this class helps store the info from the "https://ipinfo.io" API
class RequestInfo {
    constructor(ip, city, region, country, timezone){
        this.ip = ip
        this.city= city
        this.region = region
        this.country = country
        this.timezone = timezone
    }
}
// Organaizse the UA info of the Request
class UserAgent {
    constructor(ua , browser, os, device){
        this.ua = ua
        this.browser = browser
        this.os = os
        this.device = device
    }
}
//  Here begin the set of promises for the ASYNC email function

// this promises to get the request IP and other location information and create a new RequestInfo Obj
// if it fails it sets the value to unknown
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

// this promises to have the request UA information and pass onto the UserAgent class 
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







// The asymn function begins, in order to have this function execute it has have the 2 previous promises resolve/reject hence await
async function sendEmail(){
    // await for the promisese resolution
    let userInfo = await emailUserInfoPromise()
    let userAgent = await emailUAPromise()

    // this is form that will be validated in order to create an email
    const form = document.forms['emailForm']

    // regex pattern to validate an email
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


    // error tracker
    let errors = 0

    // this validates the messageField from the form in the HTML
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
    // this validates the selection field ie the reason for contact
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
    // this validates the email by ensuring it matches the regex pattern
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
    //validates the last name if it's less than 3 or simply an empty string
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
    // validates the first name and it ensures that is more than 3 char or not emptys
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
    
    // this the validation send off
    function validations(e){
        // calling the validation functions
        firstNameValidation();
        lastNameValidation()
        emailValidation();
        reasonValidation();
        messageValidation();
        console.log(errors)
        // if theres no errors form is valid
        if(errors === 0){
            if(alertCounter === 0){
                // i don't have it submit the form to simply visualize what the email will look like
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
        }
        // theres 1 or more error in the form see the front end HTML for more deats
        else{
            e.preventDefault()
            errors = 0
            form['submitBTN'].addEventListener('click', (e)=>{validations(e)})
        }
    }
        // this is the listener for the form submission
        form.addEventListener('submit', (e)=>{validations(e)})

}
// since the function is async it needs to be called since it's dependent on await values it wont excute until the params are met
sendEmail()
