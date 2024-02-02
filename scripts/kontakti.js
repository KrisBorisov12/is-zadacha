document.addEventListener('DOMContentLoaded', function () {
    const contactSearchBox = document.querySelector('input[type="search"]');

    // load contact data from the contacts.json file
    fetch('contacts.json')
        .then(response => response.json())
        .then(contactList => {
            window.fullContactList = contactList;
            displayContacts(window.fullContactList);

        })
        // catch error if there be one
        .catch(error => console.error('Unable to load contacts:', error));


    // set up a listener for changes in the search box (automatically refresh contents without reloading page)
    contactSearchBox.addEventListener('keyup', function () {
        const enteredText = this.value.toLowerCase();
        const filteredList = window.fullContactList.filter(person =>
            person.name.toLowerCase().includes(enteredText) ||
            person.family_name.toLowerCase().includes(enteredText)
        );


        displayContacts(filteredList);
    });
});

// add new contact form
function toggleAddContactForm() {
    const form = document.getElementById('addContactForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
// function add a new contact to the list
function addNewContact() {
    const newContact = {
        id: window.fullContactList.length + 1,
        name: document.getElementById('newContactName').value,
        family_name: document.getElementById('newContactFamilyName').value,
        job_position: document.getElementById('newContactPosition').value,
        email: document.getElementById('newContactEmail').value,
        phone: document.getElementById('newContactPhone').value,
        city: document.getElementById('newContactCity').value
    };

    window.fullContactList.push(newContact); 
    displayContacts(window.fullContactList);
    toggleAddContactForm(); // hide form after adding the contact
}

// event listener for the add new contacts button
document.getElementById('showAddContactFormBtn').addEventListener('click', toggleAddContactForm);
// event listener for the add contacts button within the form
document.getElementById('addContactBtn').addEventListener('click', addNewContact);


// function to show contacts on the page
function displayContacts(listOfContacts) {
    const contactGrid = document.querySelector('.grid-container');
    contactGrid.innerHTML = ''; // clear out existing contacts

    // add each contact to the grid
    listOfContacts.forEach(individual => {
        const contactBlock = document.createElement('div');
        contactBlock.classList.add('grid-item');
        contactBlock.innerHTML = `
            <h3>${individual.name} ${individual.family_name}</h3>
            <div class="spacing">
            <p class=""> ${individual.job_position}</p>
            </div>
            <p> <a href="mailto:${individual.email}">${individual.email}</a></p>
            <p> <a href="tel:${individual.phone}">${individual.phone}</a></p>
            <p class="right"> ${individual.city}</p>
        `;
        contactGrid.appendChild(contactBlock);
    });
}
