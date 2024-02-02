document.addEventListener('DOMContentLoaded', function() {
    fetch('contacts.json')
        .then(response => response.json())
        .then(data => populateContacts(data, maxContacts))
        .catch(error => console.error('Error:', error));
});

const maxContacts = 10; //variable for maximum number of contacts to be displayed

function populateContacts(contacts, max) {
    const gridContainer = document.querySelector('.grid-container');
    contacts.slice(0, max).forEach(contact => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <h3>${contact.name} ${contact.family_name}</h3>
            <p><a href="tel:${contact.phone}">${contact.phone}</a></p>
        `;

        gridContainer.appendChild(gridItem);
    });
}
