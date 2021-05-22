// console.log('client side js file');


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const firstMessage = document.querySelector('#first-message')
const secondMessage = document.querySelector('#second-message')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchInput.value
    firstMessage.textContent = 'Loading ...'
    secondMessage.textContent = ''
    const url = '/weather?address=' + (location) 
    fetch(url).then((response) => {
    response.json().then((data) => {
        firstMessage.textContent = ''
        if(data.error){
            return secondMessage.textContent = data.error
        }
        firstMessage.textContent = data.location
        secondMessage.textContent = data.forecast
    })
})
})