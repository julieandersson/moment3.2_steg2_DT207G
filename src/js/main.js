"use strict"

const apiUrl = 'https://moment3-2-steg1-dt207g.onrender.com/workexperience';

// Funktion för att hämta arbetserfarenheter och visa dem i en lista
async function fetchWorkExperience() {
    const listElement = document.getElementById('work-experience-list');

    const loadingMessage = document.getElementById('loading-message'); // Hämta laddningsmeddelandet

    if (!listElement) {
        // Om elementet inte finns, avbryt funktionen
        return;
    }

    // Visa laddningsmeddelandet
    loadingMessage.style.display = 'block'; 

    try {
        // Skickar GET-förfrågan till API:et för att hämta data
        const response = await fetch(apiUrl);

        // Kontrollera om förfrågan lyckades, om inte, skicka ett felmeddelande
        if (!response.ok) {
            throw new Error('Något gick fel med API-förfrågan');
        }
        // Gör om API-svaret till JSON-format
        const workExperiences = await response.json();
        
        listElement.innerHTML = ''; // Rensa listan innan uppdatering

        // Loopa genom varje arbetserfarenhet och lägg till den i listan
        workExperiences.forEach(experience => {
            // Omvandla datum till svenska standard-format
            const startDate = new Date(experience.startdate).toLocaleDateString('sv-SE');
            const endDate = new Date(experience.enddate).toLocaleDateString('sv-SE');

            
            // Nytt list-item för varja arbetserfarenhet
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <strong>Jobbtitel:</strong> ${experience.jobtitle} <br>
            <strong>Företagsnamn:</strong> ${experience.companyname} <br>
            <strong>Plats:</strong> ${experience.location} <br>
            <strong>Perioden:</strong> ${startDate} - ${endDate} <br>
            <strong>Beskrivning:</strong> ${experience.description}
        `;

            // Skapa raderingsknapp
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Radera';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => deleteWorkExperience(experience._id)); // Kopplar raderingsfunktionen till knappen
        
            // Lägg till knappen till varje arbetserfarenhet (list-item)
            listItem.appendChild(deleteButton);
            // Lägg till i DOM
            listElement.appendChild(listItem);
        });
    } catch (error) {
        // Felmeddelande om något går fel under hämtningen
        console.error('Fel vid hämtning av arbetserfarenheter:', error);
    } finally {
        // Döljer laddningsmeddelandet när förfrågan är klar och listan visas på startsidan
        loadingMessage.style.display = 'none';
    }
}

// Funktion för att lägga till/skicka en ny arbetserfarenhet via formuläret
async function addWorkExperience(event) {
    event.preventDefault();

    // Skapar ett objekt för den nya arbetserfarenheten med värden från formuläret
    const newExperience = {
        companyname: document.querySelector("#companyname").value,
        jobtitle: document.querySelector("#jobtitle").value,
        location: document.querySelector("#location").value,
        startdate: document.querySelector("#startdate").value,
        enddate: document.querySelector("#enddate").value,
        description: document.querySelector("#description").value,
    };

    // Array för att lagra felmeddelanden
    let errors = [];

    // Kontrollera om alla fält är tomma
    if (!newExperience.companyname && !newExperience.jobtitle && !newExperience.location && !newExperience.startdate && !newExperience.enddate && !newExperience.description) {
        errors.push("Formuläret kan inte vara tomt.");
    } else {
        if (!newExperience.companyname) errors.push("Du måste ange ett företagsnamn.");
        if (!newExperience.jobtitle) errors.push("Du måste ange en jobbtitel.");
        if (!newExperience.location) errors.push("Du måste ange en plats.");
        if (!newExperience.startdate) errors.push("Du måste ange ett startdatum.");
        if (!newExperience.enddate) errors.push("Du måste ange ett slutdatum.");
        if (!newExperience.description) errors.push("Du måste ange en beskrivning av ditt arbete.");
    }

    if (errors.length > 0) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = errors.join(", ");
        errorDiv.style.display = 'block'; // Visar felmeddelanden
        document.getElementById('success-message').style.display = 'none'; // Dölj bekräftelsemeddelandet
        return; // Stoppa om det finns fel
    }  

    try {
        // Skickar förfrågan till API:et för att lägga till den nya arbetserfarenheten
        const response = await fetch(apiUrl, {
            method: 'POST', // POST-förfrågan
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExperience) // Konvertera till JSON
        });


        if (!response.ok) {
            const errorData = await response.json();
            const errorDiv = document.getElementById('error-message');
            errorDiv.textContent = errorData.errors.join(", ");
            errorDiv.style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
            return;
        }

        const result = await response.json();
        // Meddelande för att bekräfta att arbetserfarenheten har lagts till
        const successDiv = document.getElementById('success-message');
        successDiv.textContent = 'Arbetserfarenhet tillagd!';
        successDiv.style.display = 'block'; // Visar bekräftelseomeddelandet
        document.getElementById('error-message').style.display = 'none'; // Döljer felmeddelanden

        // Rensa formulär efter att arbetserfarenhet har lagts til
        form.reset();
    } catch (error) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = 'Ett fel uppstod, försök igen.';
        errorDiv.style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }
}

// Event listener för att hantera formulärets submit-knapp
const form = document.getElementById('add-experience-form');
if (form) {
    form.addEventListener('submit', addWorkExperience);
}

// Funktion för att radera en arbetserfarenhet
async function deleteWorkExperience(id) {
    const confirmed = confirm("Är du säker på att du vill radera denna arbetserfarenhet?");
    if (!confirmed) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Något gick fel vid raderingen.');
        }

        // Uppdatera listan efter radering
        fetchWorkExperience();
    } catch (error) {
        console.error('Fel vid radering av arbetserfarenhet:', error);
    }
}


// Kör funktionen när sidan laddas
window.onload = fetchWorkExperience;
