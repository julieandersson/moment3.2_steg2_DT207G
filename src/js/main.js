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

// Kör funktionen när sidan laddas
window.onload = fetchWorkExperience;
