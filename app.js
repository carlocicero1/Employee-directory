$('.modal-container').hide();
const listOfEmployees = [];

function appendEmployee (employee) {
	$('#gallery').append(employee)
}

function createEmployees () {
	$.ajax({
		url: 'https://randomuser.me/api/?results=12',
		dataType: 'json',
		success: function (data) {
			
			for(let i = 0; i < data.results.length; i++) {
				const { email, name, location, picture } = data.results[i]
				listOfEmployees.push(data.results[i]);
				const newPerson = `
				<div class="card" data-person="${i}">
					<div class="card-img-container">
					<img class="card-img" src="${picture.large}" alt="profile picture">
						</div>
						<div class="card-info-container">
								<h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
								<p class="card-text">${email}</p>
								<p class="card-text cap">${location.city}, ${location.state}</p>
						</div>
				</div>`

				appendEmployee(newPerson)
			}
			
			events();
		},
		error: function (err) {
			alert(err, err.statusText);
		}
	})
}

function events () {
	$('.card').on('click', (e) => {
		const $target = $(e.currentTarget)
		const index = $target.data('person')
		const person = listOfEmployees[index];
		loadModal(person);
	
	})

}

function loadModal (person) {
	
		$('.modal-container').show();
		const email = person.email
			const firstName = person.name.first
			const lastName = person.name.last
			const title = person.name.title
			const phoneNum = person.phone
			const city = person.location.city
			const street = person.location.street
			const state = person.location.state
			const postcode = person.location.postcode
			const dateOfBirth = person.dob.date
			const picture = person.picture.large
	
			$('.modal-img').attr('src', picture)
			$('.email').text(email)
			$('.modal-name').text(`${title} ${firstName} ${lastName}`);
			$('.phone').text(phoneNum)
			$('.city').text(city)
			$('.address').text(`${street}, ${city}, ${state} ${postcode}`);
			$('.birthday').text(`Birthday: ${dateOfBirth}`)

}

$('.modal-close-btn').on('click', () => {
	$('.modal-container').hide();
})

createEmployees();