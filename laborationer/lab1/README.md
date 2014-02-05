Laboration 01
=============

[Webbplatsen](http://cn222gc.jit.su/)

Från början använde jag php och curl, men när jag skulle testa sidan på mitt
webbhotell fungerade inte curl. Jag fick ett felmeddelande som inte sa mycket
mer att det inte fungerade.

Så tillslut gav jag upp och skrev om webbplatsen till Nodejs istället. Jag
använder fortfarande curl och för att läsa ut data från sidorna använder jag
Cheerio. Cheerio implementerar jQuery core i Nodejs.

För att inte få så många nästlade funktioner använder jag Async (jag menar
nested callbacks men jag vet inte vad det heter på svenska). Det är första
gången jag använder Async och vet inte så mycket om det, men jag kommer använda
det så ofta jag kan i fortsättningen.

En god webbskrapare
-------------------

Jag har inte gjort så mycket för att vara en god webbskrapare. Men jag har iaf
fått tillåtelse av webbplatsägeren att skrapa webbplatsen.

Jag skriver ut senaste datumet som sidan skrapades för att användaren ska veta
om det är lönt att skrapa igen. Jag hade kunnat hindra nya skrapningar innan
det har gått en viss tid från förra, men det gjorde jag inte.

Jag hade kunnat ha en delay mellan skrapningarna av de olika producentsidorna,
men i detta fallet kändes det onödigt eftersom det inte var så många sidor.

Risker
------

En risk med automatisk skrapning är att jag måste kontrollera data som skrapas
så att den inte innehåller någon skadlig kod.

Om ägaren till webbplatsen ändrar något i htmlen kanske min kod slutar fungera.
Ägaren kommer antagligen inte varna mig och därför kan det ta ett par dagan
innan min webbplats fungerar igen.

Om jag inte har frågat webbplatsägaren innan kanske hen inte gillar att jag
skrapar sidan och bestämmer sig för att blockera mig. Men även om jag har fått
tillåtelse kan webbplatsägaren ändra sig.

ASP.NET WebForms
----------------

ASP.NET WebForms använder en ViewState som innehåller en massa information och
utan den fungerar inte webbplatsen. Man måste göra en post med ViewState-datan.

Vad jag lärt mig
----------------

Jag har lärt mig att inte använda php när jag själv får välja
programmeringsspråk och det är skönt att kunna byta ut ett Npm-packet mot ett
annat om man inte får det första att fungerar.

Jag har lärt mig hur curl fungerar och att det är bra att kolla i webbläsaren
eller terminalen för att se vilka statuskoder man får.
