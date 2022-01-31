## Dokumentation
### Allmän info
Detta är en snabb PoC lösning på en webbapplikation som visar upp alla tillgängliga DevOps jobb i Stockholm med Arbetsförmedlingen som källa. 

Applikationen fungerar på så sätt att vi webscrapar all nödvändig information från Arbetsförmedlingens hemsida. Sedan tar vi emot datan och skickar den till klienten med hjälp av en json fil. Datan vi får från json filen använder vi sedan för att automatgenerera bootstrap boxar med hjälp av javascript så att vi kan visa upp de tillgängliga jobben i Stockholm med titlen "DevOps".

OBS! När man uppdaterar annonserna med hjälp av "Uppdatera Annonser" knappen så tar det cirka 1-2 min.

### Moduler/Paket
Vi har använt oss av Puppeteer och fs modulen för att skapa denna PoC.

Puppeteer valde vi för att vi såg det som det enklaste sättet att webscrapa den viktiga informationen vi behövde från Arbetsförmedlingens sida.

Fs modulen använder vi för att enkelt föra över datan till klienten med hjälp av att skapa en json fil.
