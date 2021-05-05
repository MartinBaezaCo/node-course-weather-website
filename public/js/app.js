const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')



weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value

    console.log(location)

    messageOne.textContent = 'Fetching weather data...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch ('/weather?address='+location).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = "The time is " + data.description 
            messageThree.textContent = 'It is currently ' + data.temperature + ' degrees, it feels like ' + data.feelslike + ' degrees outside. Humidity is currently: ' + data.humidity + "%"
        }
       
    }) 
})

})