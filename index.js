const form = document.querySelector('form')
const address = document.querySelector('#address-input')
const city = document.querySelector('#city-input')
const state = document.querySelector('#state-input')
const zipCode = document.querySelector('#zipCode-input')
const propertyStatus = document.querySelector('#status-input')
const propertyList = document.querySelector('#propertyList')
const getListButton = document.querySelector('#list')

//
function handleSubmit(evt) {
	evt.preventDefault();

    let body = {
        address : address.value,
        city : city.value,
        state : state.value,
        zipCode : zipCode.value,
        propertyStatus : propertyStatus.value
    }
	
    axios.post('http://localhost:3000/input/', body)
        .then((res) => {
            console.log(response)
        })
        .catch(err => console.log(err))

	alert("Successfully Submitted");
}

//
function getProperties() {
    propertyList.innerHTML = ''

    axios.get('http://localhost:3000/properties/')
        .then(res => {
            res.data.forEach(element => {
                let propertyCard = `<div class="property-card">
                    <h2>Your Property</h2>
                    <h3>Address: ${element.address}</h3>
                    <h3>City: ${element.city}</h3>
                    <h3>State: ${element.state}</h3>
                    <h3>Zip Code: ${element.zipCode}</h3>
                    <h3>Status: ${element.propertyStatus}</h3>
                    <button onclick="deleteCard(${element['property_id']})">Delete</button>
                    </div>
                `

                propertyList.innerHTML += propertyCard
            })
        })
}

//
function deleteCard() {
    axios.delete(`http://localhost:3000/properties/${id}`)
    .then(() => getProperties())
    .catch(err => console.log(err))
}

function hello() {
    alert("Hello World!");
}

form.addEventListener('submit', handleSubmit);
getListButton.addEventListener('click', getProperties);