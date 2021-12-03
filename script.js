const $form = document.getElementById("form")                                      //creating variables from html
const $formYear = document.getElementById("formYear")
const $formMonth = document.getElementById("formMonth")
const $formDay = document.getElementById("formDay")
const $formButton = document.getElementById("formButton")
const $finalDisplay = document.getElementById("finalDisplay")
const $reset = document.getElementById("reset")

let userDate                                                                //variable for new date

const stringDate = localStorage.getItem("userDate")
const storedDate = new Date(stringDate)

function extractDate(){                                                         //extracting date from local storage if it exists
    if(stringDate){
        userDate = storedDate
        output()
    }
    return userDate
}


$formMonth.addEventListener('click', function(){        //function to decide the number of days to choose from for the user
    function dayCount(){
        if($formMonth.value == '1' || $formMonth.value == '3' || $formMonth.value == '5' || $formMonth.value == '7' || $formMonth.value == '8' || $formMonth.value == '10' || $formMonth.value == '12'){
            let days31 = []
            for(let i=1; i<=31; i++){
                days31.push(`<option value=${i} id=${i}>${i}</option>`)
            }
            $formDay.innerHTML = days31.join('')
        }
        else if($formMonth.value == '4' || $formMonth.value == '6' || $formMonth.value == '9' || $formMonth.value == '11'){
            let days30 = []
            for(let i=1; i<=30; i++){
                days30.push(`<option value=${i} id=${i}>${i}</option>`)
            }
            $formDay.innerHTML = days30.join('')
        }
        else{
            let days28 = []
            for(let i=1; i<=28; i++){
                days31.push(`<option value="${i}" id="${i}">${i}</option>`)
            }
            $formDay.innerHTML = days28.join('')
        }
    }
    dayCount()
})

let starterDate

$formButton.addEventListener('click', function(event){              //submitting form data
    event.preventDefault()

    $form.style.display = "none"
    $finalDisplay.style.display = "block"
    $reset.style.display = "block"

    starterDate = new Date($formYear.value, $formMonth.value-1, $formDay.value)
    userDate = starterDate
    localStorage.setItem('userDate', new Date($formYear.value, $formMonth.value-1, $formDay.value))
})

$formButton.addEventListener('click', output)
function output(){                                          //function to calculate the difference between the dates and display it
    setInterval(function (){
        const todaysDate = new Date()
        const difference = userDate.getTime() - todaysDate.getTime()

        function toDays(ms){
            return Math.floor(ms/1000/60/60/24)
        }

        function toHours(ms){
            const hours= Math.floor(ms/1000/60/60)
            const days = toDays(ms)
            const remainingHours = hours - (days*24)
            return remainingHours
        }

        function toMinutes(ms){
            const minutes= Math.floor(ms/1000/60)
            const days = toDays(ms)
            const hours = toHours(ms)
            const remainingMinutes =minutes - ((hours*60)+(days*24*60))
            return remainingMinutes
        }

        function toSeconds(ms){
            const seconds= Math.floor(ms/1000)
            const days = toDays(ms)
            const hours = toHours(ms)
            const minutes = toMinutes(ms)
            const remainingSeconds =seconds - ((minutes*60)+(hours*60*60)+(days*24*60*60))
            return remainingSeconds
        }

        $finalDisplay.innerHTML = `<h3>Time Left</h3> <h4>Days : Hours : Minutes : Seconds</h4> 
                                    <p><span>${toDays(difference)}</span>:<span>${toHours(difference)}</span>:<span>${toMinutes(difference)}</span>:<span>${toSeconds(difference)}</span></p>`
    }, 1000)

    setTimeout(function(){
        $reset.innerHTML = `<button type="submit" id="reset">Set new Date</button>`
    }, 1000)
}

$reset.addEventListener('click', function(){
    $reset.style.display = "none"
    $finalDisplay.style.display = "none"

    document.getElementById("form").reset();
    $form.style.display = "block"

})

extractDate ()