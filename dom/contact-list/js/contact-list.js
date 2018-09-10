const contacts = document.querySelector('ul.contacts-list');
const loadedContacts = JSON.parse(loadContacts());

contacts.innerHTML = '';

for (loadedContact of loadedContacts) {
	let contact = contacts.appendChild(document.createElement('li'));
	contact.dataset.email = loadedContact['email'];
    contact.dataset.phone = loadedContact['phone'];
    contact.innerHTML = loadedContact['name']; 
}
