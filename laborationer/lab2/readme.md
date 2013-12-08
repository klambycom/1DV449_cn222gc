Laboration 02
=============


Optimering
----------

### Ta bort 404:or

Det finns två javascript filer som inte finns på servern, och det ser ut som de
tar väldigt lång tid att ladda. Men jag vet inte om det är så eftersom Chrome
inte verkar visa tiden korrekt på dem två filerna.

Sidan laddades snabbare innan jag tog bort link-taggarna till js-filerna som
inte fanns med det var bara 0.05 sekunders skillnad så det finns antagligen
andra saker på sidan som tar längre tid att ladda. Det blev två färre requests.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#01-ta-bort-404or)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/b6c0d4168e47a23c9f94636a98c61c9935c771ea)


### Förminska bild i Photoshop i stället för CSS

Bildenn pics/food.jpg är 2,1 MB och förminska på sidan med css från 2048px x 1536px
till 293px x 220px.

Nu tar sidan 0,03 sekunder längra att ladda, varje förändring jag gör
färlännger laddtiden. Men storleken på sidan har gått from 2,4 MB till 502 KB
iaf.

Anledningen till att laddtiden inte förbättras tror jag är att det finns fler
saker på sidan som tar tid att ladda.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#02-stor-bild)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/ed14342901264ae0da57fc8130797c55684ee1a4)

## Vad är css.php?

Det finns två css-filer som hämtas från vhost3.lnu.se/~1dv449 som tar väldigt
lång tid att ladda. Filerna genereras med hjälp av php, men det finns inga
kommentarer som förklarar varför.

Jag tänker lägga filerna på min server istället eftersom filerna inte ändras
och inte cachas.

Laddtiden blev mycket bättre och är nu oftast under en sekund. Det är inte
längre lika många parallella nerladdningar, men det får jag fixa senare.

Jag kunde inte se att css-filerna ändrades, men om de gör det så skulle jag
kunna cacha filerna på min server istället för att bara lägga filerna där
manuellt.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#03-cssphp)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/13f88869be6835c6c0db978cd9c1fe9b9f1c7060)


### En css-fil

Det finns 5 css-filer och lite css i html-filen så om jag lägger all css i
en fil blir det 4 färre http-anrop och all css kan cachas.

Referens är High Performance Web Sites sidan 29.

Jag bestämde mig för att ha en bootstrap.css och en screen.css eftersom jag
kommer använda CDN för Bootstrap senare.

Tiden att ladda sidan är nu en halv sekund och 13 requests.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#04-en-css-fil)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/b1b09aeb2fe2500e694c5554ddb9cabbecc4d294)


# Förminska css

Enligt boken High Perfomance Web Sites tjänar man oftast inte så mycket på att
förminska (minifying) css. Men eftersom cssen kommer har kompilerats från scss
i development mode och inte production mode finns det många kommentarer och 
därför tror jag filstorleken kommer minska ganska mycket.

Det blev kanske ingen jättestor skillnad men css-filen blev hälften så stor och
det enda jag gjorde var att ändrat från development till produktion.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#05-f%C3%B6rminska-css)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/ee730fcc128c23a3d50c187cb1d6b628de0da4cc)


### Content Delivery Network

Google har CDN för ett antal js-bibliotek, så det kommer jag använda för jQuery.
Bootstrap har CDN för sin css fil som jag också tänker använda. Det kommer göra
så att fler filer kan laddas ner samtidigt och det finns stor chans att filerna
redan är chachade.

Referens är boken High Performance Web Sites kapitel fyra.

Det blev väldigt bra resultat, men antagligen inte pga jag använder CDN. Jag
gömde att jQuery och Bootstrap inte var minified. Det blev inte fler parallella
nerladdningar i Chrome. Men jag kommer ändå ha kvar det eftersom jag tror det
kommer gå fortare för en vanlig använda som har cache igång i webbläsaren.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#06-cdn)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/db613b3670865290af113614c03425c6ad05c8e1)

### Minifying javascript

Jag ska ta all javascript (inte jQuery) och lägga i en fil som jag sen förminskar. Jag kommer
samtidigt lägga all javascript längst ner html-filen.

Storleken på både html och javascript kommer minska eftersom det just nu är
blandat.

Referens är boken High Performance Web Sites kapitel 8, 10 och 12.

Mess.php blev nästan hälften så stor och javascript-filen tar bara lite längre
tid att ladda än vad en javascript-fil gjorde innan och ibland mindre.

Det kan vara ett problem att javascript-filen ibland tar längre tid att ladda
ner eftersom alla javascript-filer laddades ner parallelt innan.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#07-minifying-javascript)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/9752cd86f8c30053ed3e2e8d3e6470f8b1720ba6)


## Gzip

Komprimera filerna med Gzip och mod_deflate, för att filerna ska bli mindre.

23 KB mindre att ladda ner.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#08-gzip)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/4a817773d4aef13d9131d240702fea026b76dcc1)


### En link-tag för fonts

Det finns en link-tag för varje font, och jag såg på Google Fonts att det går
att använda en tag för alla fonterna.

Det blev väldigt liten skillnad.

[Testresultat](https://github.com/klambycom/1DV449_cn222gc/wiki/Lab-02-tests#09-en-link-tag-f%C3%B6r-fonts)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/dc2bf2649db6648db84d2633474fbd9e0f17a621)


Säkerhetsproblem
----------------

### Sql injections

Sidan är inte skyddad mot sql injections, vilket gjorde så jag kunde logga in
med avnändarnamn admin och lösenord ' OR '' = '.

Istället för att skicka med användarens inmatning direkt i sql-frågan måste
tecken som ' göras om, och det kan PDO göra:

```php
$q = "SELECT id FROM users WHERE username = ? AND password = ?";
$stm = $db->prepare($q);
$stm->execute(array($u, $p));
```

[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/4cbacc0e21e760e3dfcf7191d21579b41d9024ba)

### Html och javascript i meddelande

Det går att skriva html och javascript i kommentarsfunktionen. Så om jag är
Scan vill jag kanske att alla länkar ska leda till mig istället för att visa
information om någon annan producent.

```javascript
<script>
function changeProducer() {
  window.location = "http://www.scan.se/";
}
</script>
```

Det går att fixa med `htmlspecialchars`.

[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/2a04f9c105c509b9cedc4aaee3e0f21a45d814bc)

### Ladda ner databas

Databasen går att ladda ner om man kan adressen, men det är ett ganska dåligt
namn så det går säkert att gissa. Enklaste lösningen är antagligen att flytta
den någonstans som inte är tillgängligt utåt.

För mig är public_html tillgänglig men inte mappen som public_hml ligger,
därför la jag db.db där.

[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/c772a9403bc60ebe78b4ed710efd1617031dfec0)

### Logga ut

För att logga ut måste man stänga webbläsaren. Det finns en logga ut-knapp som
inte fungerar, så om man klickar på den är man fortfarande inloggad även om man
kanske inte tror det. Och då kan någon annan använda datorn efter och posta
kommentarer som den inloggade personen.

Vid utloggning ska sessionen tas bort.

[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/badaf6c045952ad11b010105d5389a9205c08680)


Long Polling
------------

Jag anropar filen longpoll.php med javascript. Longpoll.php stänger sessionen
eftersom den annars kan låsas för andra förfrågningar, tror jag.

Sen pausas php i två sekunder med sleep(), efter det så kollar den om det finns
nya kommentarer för producenten i database.

Om det finns nya kommentarer skrivs de ut som json. Kommentarerna skivs ut och
filen longpoll.php anropas igen med javascript.

Om det inte finns nya kommentarer räknas en räknare upp och koden körs igen,
när koden har körts 15 gånger avslutas php-koden. Om användare fortfarande är
inne på sidan görs ett nytt anrop till longpoll.php.

Jag anväde Web Sockets i Individuellt mjukvaruutvecklingsprojekt, så det var
intressant att se hur Long Polling fungerar. Projektet hade varit jobbigt att
göra med Long Polling.

[Testa long polling](http://www.kattmjao.se/1dv449/)
[Commit](https://github.com/klambycom/1DV449_cn222gc/commit/61faff26976b7410137fc5017cd64f27841624ac)
