# Moment 3.2 - Webbplats - DT207G
## NoSQL-databaser
Denna uppgift tillhör steg 2 i moment 3.2 i kurs DT207G och är en fortsättning på steg 1 https://github.com/julieandersson/moment3.2_steg1_DT207G.git där jag har skapat en REST-webbtjänst med Atlas MongoDB som databas. 

Moment 3 i denna kurs går ut på att skapa samma typ av webbtjänst och webbplats som i Moment 2, fast nu med MongoDB (NoSQL) som databas-server istället för en relationsdatabas.


### Uppgiftsbeskrivning:
Denna uppgift gick alltså ut på att konsumera den webbtjänst som skapades i steg 1 av moment 3.2, och skapa en webbplats utifrån bestämda krav. Webbplatsen består utav:

- En startsida
- En lägg till-sida
- En om-sida

Datan i webbtjänsten lagras i en NoSQL-databas Atlas MongoDB. Webbplatsen använder Fetch API med GET, POST samt DELETE för att visa datan i en lista, lägga till ny post i listan via ett formulär samt radera en post. 

### Funktionalitet
På startsidan visas alla poster med arbetserfarenheter i enskilda "block" i en lista. Här kan man som användare även välja att radera en post om så önskas. 

På lägg till-sidan finns ett formulär där användaren kan lägga till nya arbetserfarenheter som sedan visas på startsidan. Felmeddelanden är definierade för formuläret om enskilda fält eller samtliga fält skulle saknas när en post skapas. 

Om-sidan beskriver webbplatsen och syftet med den, samt information om hur den är skapad och mina egna slutsatser av uppgiften. 

### Använda tekniker
Detta projekt är skapat med HTML, JavaScript, och CSS samt använder Parcel för en automatiserad utvecklingsmiljö. Projektet är knutet till Github för commits av arbetet. 


### Skapad av
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 3.2 steg 2 i kursen DT207G Backendbaserad Webbutveckling
