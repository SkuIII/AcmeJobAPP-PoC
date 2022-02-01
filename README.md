## Dokumentation
### Allmän info
Detta är en snabb PoC lösning på en webbapplikation som visar upp alla tillgängliga DevOps jobb i Stockholm med Arbetsförmedlingen som källa. 

Applikationen fungerar på så sätt att vi webscrapar all nödvändig information från Arbetsförmedlingens hemsida. Sedan tar vi emot datan och skickar den till klienten med hjälp av en JSON fil. Datan vi får från JSON filen använder vi sedan för att automatgenerera bootstrap boxar med hjälp av javascript så att vi kan visa upp de tillgängliga jobben i Stockholm med titlen "DevOps".

Att ge arbetsplatser med postkoder som börjar på "111" en utmärkelse till exempel en annan färg på bakgrunden kunde inte uppfyllas i denna PoC. Det beror på sättet Arbetsförmedlingen har lagt upp sin sida, det är definitvt ett problem som är möjligt att lösa men det kommer ta mer tid än förväntat.

OBS! När man uppdaterar annonserna med hjälp av "Uppdatera Annonser" knappen så tar det cirka 1-2 min.

### Moduler/Paket
Vi har använt oss av Puppeteer och fs modulen för att skapa denna PoC.

Puppeteer valde vi för att vi såg det som det enklaste sättet att webscrapa den viktiga informationen vi behövde från Arbetsförmedlingens sida.

Fs modulen använder vi för att enkelt föra över datan till klienten med hjälp av att skapa en JSON fil.

### Live exempel
Webbapplikationen är live [här](https://obscure-springs-27298.herokuapp.com)

### Kod
[Frontend JavaScript](https://github.com/ogus02/AcmeJobAPP-PoC/blob/main/public/javascripts/main.js). Webapplikationen genereras här med hjälp av datan från Arbetsförmedlingen.
Själva webscrapingen görs [här](https://github.com/ogus02/AcmeJobAPP-PoC/blob/main/routes/data.js).

### Contributors
[Oscar Gustafsson](https://github.com/ogus02), [Adam Pousette](https://github.com/apousette) och [Kasiem Saeed](https://github.com/Kasiem024)
