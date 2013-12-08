Laboration 02
=============


Optimering
----------

### Ta bort 404:or

Det finns två javascript filer som inte finns på servern, och det ser ut som de
tar väldigt lång tid att ladda. Men jag vet inte om det är så eftersom Chrome
inte verkar visa tiden korrekt på dem två filerna.

Innan förändring:
18 requests, 2.4 MB transferred, 1.84 s
18 requests, 2.4 MB transferred, 3.01 s
18 requests, 2.4 MB transferred, 2.99 s
18 requests, 2.4 MB transferred, 1.87 s
18 requests, 2.4 MB transferred, 2.74 s
18 requests, 2.4 MB transferred, 3.28 s
18 requests, 2.4 MB transferred, 2.95 s
18 requests, 2.4 MB transferred, 3.00 s
18 requests, 2.4 MB transferred, 3.05 s
18 requests, 2.4 MB transferred, 2.61 s
18 requests, 2.4 MB transferred, 3.38 s
18 requests, 2.4 MB transferred, 2.77 s
18 requests, 2.4 MB transferred, 1.80 s
18 requests, 2.4 MB transferred, 1.96 s
18 requests, 2.4 MB transferred, 2.28 s
18 requests, 2.4 MB transferred, 3.12 s
18 requests, 2.4 MB transferred, 2.18 s
18 requests, 2.4 MB transferred, 3.27 s
18 requests, 2.4 MB transferred, 2.23 s
18 requests, 2.4 MB transferred, 2.94 s

I genomsnitt innan förändring:
18 requests, 2.4 MB transferred, 2.67 s

Efter förändring:
16 requests, 2.4 MB transferred, 2.79 s
16 requests, 2.4 MB transferred, 1.95 s
16 requests, 2.4 MB transferred, 3.28 s
16 requests, 2.4 MB transferred, 3.16 s
16 requests, 2.4 MB transferred, 2.49 s
16 requests, 2.4 MB transferred, 2.64 s
16 requests, 2.4 MB transferred, 3.03 s
16 requests, 2.4 MB transferred, 3.11 s
16 requests, 2.4 MB transferred, 2.13 s
16 requests, 2.4 MB transferred, 2.26 s
16 requests, 2.4 MB transferred, 2.93 s
16 requests, 2.4 MB transferred, 2.83 s
16 requests, 2.4 MB transferred, 2.63 s
16 requests, 2.4 MB transferred, 3.22 s
16 requests, 2.4 MB transferred, 2.47 s
16 requests, 2.4 MB transferred, 2.11 s
16 requests, 2.4 MB transferred, 3.03 s
16 requests, 2.4 MB transferred, 3.40 s
16 requests, 2.4 MB transferred, 3.17 s
16 requests, 2.4 MB transferred, 1.86 s

I genomsnitt efter förändring:
16 requests, 2.4 MB transferred, 2.72 s

Sidan laddades snabbare innan jag tog bort link-taggarna till js-filerna som
inte fanns med det var bara 0.05 sekunders skillnad så det finns antagligen
andra saker på sidan som tar längre tid att ladda.


### Förminska bild i Photoshop i stället för CSS

Bildenn pics/food.jpg är 2,1 MB och förminska på sidan med css från 2048px x 1536px
till 293px x 220px.

Innan förändring:
16 requests, 2.4 MB transferred, 2.79 s
16 requests, 2.4 MB transferred, 1.95 s
16 requests, 2.4 MB transferred, 3.28 s
16 requests, 2.4 MB transferred, 3.16 s
16 requests, 2.4 MB transferred, 2.49 s
16 requests, 2.4 MB transferred, 2.64 s
16 requests, 2.4 MB transferred, 3.03 s
16 requests, 2.4 MB transferred, 3.11 s
16 requests, 2.4 MB transferred, 2.13 s
16 requests, 2.4 MB transferred, 2.26 s
16 requests, 2.4 MB transferred, 2.93 s
16 requests, 2.4 MB transferred, 2.83 s
16 requests, 2.4 MB transferred, 2.63 s
16 requests, 2.4 MB transferred, 3.22 s
16 requests, 2.4 MB transferred, 2.47 s
16 requests, 2.4 MB transferred, 2.11 s
16 requests, 2.4 MB transferred, 3.03 s
16 requests, 2.4 MB transferred, 3.40 s
16 requests, 2.4 MB transferred, 3.17 s
16 requests, 2.4 MB transferred, 1.86 s

I genomsnitt innan förändring:
16 requests, 2.4 MB transferred, 2.72 s

Efter förändring:
16 requests, 502 KB transferred, 1.41 s
16 requests, 502 KB transferred, 3.13 s
16 requests, 502 KB transferred, 3.24 s
16 requests, 502 KB transferred, 3.40 s
16 requests, 502 KB transferred, 3.26 s
16 requests, 502 KB transferred, 2.62 s
16 requests, 502 KB transferred, 2.81 s
16 requests, 502 KB transferred, 2.69 s
16 requests, 502 KB transferred, 2.47 s
16 requests, 502 KB transferred, 2.26 s
16 requests, 502 KB transferred, 3.01 s
16 requests, 502 KB transferred, 3.25 s
16 requests, 502 KB transferred, 1.72 s
16 requests, 502 KB transferred, 2.00 s
16 requests, 502 KB transferred, 3.37 s
16 requests, 502 KB transferred, 2.95 s
16 requests, 502 KB transferred, 2.31 s
16 requests, 502 KB transferred, 2.47 s
16 requests, 502 KB transferred, 3.31 s
16 requests, 502 KB transferred, 3.34 s

I genomsnitt efter förändring:
16 requests, 502 KB transferred, 2.75 s

Nu tar sidan 0,03 sekunder längra att ladda, varje förändring jag gör
färlännger laddtiden. Men storleken på sidan har gått from 2,4 MB till 502 KB
iaf.

Anledningen till att laddtiden inte förbättras tror jag är att det finns fler
saker på sidan som tar tid att ladda.


## Vad är css.php?

Det finns två css-filer som hämtas från vhost3.lnu.se/~1dv449 som tar väldigt
lång tid att ladda. Filerna genereras med hjälp av php, men det finns inga
kommentarer som förklarar varför.

Jag tänker lägga filerna på min server istället eftersom filerna inte ändras
och inte cachas.

Innan förändring:
16 requests, 502 KB transferred, 3.25 s
16 requests, 502 KB transferred, 3.60 s
16 requests, 502 KB transferred, 1.71 s
16 requests, 502 KB transferred, 6.84 s
16 requests, 502 KB transferred, 2.76 s
16 requests, 502 KB transferred, 3.20 s
16 requests, 502 KB transferred, 2.24 s
16 requests, 502 KB transferred, 3.32 s
16 requests, 502 KB transferred, 4.02 s
16 requests, 502 KB transferred, 1.94 s
16 requests, 502 KB transferred, 6.91 s
16 requests, 502 KB transferred, 1.74 s
16 requests, 502 KB transferred, 3.18 s
16 requests, 502 KB transferred, 2.96 s
16 requests, 502 KB transferred, 2.58 s
16 requests, 502 KB transferred, 3.09 s
16 requests, 502 KB transferred, 3.09 s
16 requests, 502 KB transferred, 3.69 s
16 requests, 502 KB transferred, 2.93 s
16 requests, 502 KB transferred, 2.14 s

I genomsnitt innan förändring:
16 requests, 502 KB transferred, 3.26 s

Efter förändring:
16 requests, 502 KB transferred, 848 ms
16 requests, 502 KB transferred, 3450 ms
16 requests, 502 KB transferred, 807 ms
16 requests, 502 KB transferred, 743 ms
16 requests, 502 KB transferred, 690 ms
16 requests, 502 KB transferred, 836 ms
16 requests, 502 KB transferred, 722 ms
16 requests, 502 KB transferred, 828 ms
16 requests, 502 KB transferred, 913 ms
16 requests, 502 KB transferred, 611 ms
16 requests, 502 KB transferred, 2090 ms
16 requests, 502 KB transferred, 790 ms
16 requests, 502 KB transferred, 640 ms
16 requests, 502 KB transferred, 689 ms
16 requests, 502 KB transferred, 658 ms
16 requests, 502 KB transferred, 605 ms
16 requests, 502 KB transferred, 3380 ms
16 requests, 502 KB transferred, 645 ms
16 requests, 502 KB transferred, 571 ms
16 requests, 502 KB transferred, 667 ms

I genomsnitt efter förändring:
16 requests, 502 KB transferred, 1.06 s

Laddtiden blev mycket bättre och är nu oftast under en sekund. Det är inte
längre lika många parallella nerladdningar, men det får jag fixa senare.

Jag kunde inte se att css-filerna ändrades, men om de gör det så skulle jag
kunna cacha filerna på min server istället för att bara lägga filerna där
manuellt.


### En css-fil

Det finns 5 css-filer och lite css i html-filen så om jag lägger all css i
en fil blir det 4 färre http-anrop och all css kan cachas.

Referens är High Performance Web Sites sidan 29.

Innan förändring:
16 requests, 502 KB transferred, 848 ms
16 requests, 502 KB transferred, 3450 ms
16 requests, 502 KB transferred, 807 ms
16 requests, 502 KB transferred, 743 ms
16 requests, 502 KB transferred, 690 ms
16 requests, 502 KB transferred, 836 ms
16 requests, 502 KB transferred, 722 ms
16 requests, 502 KB transferred, 828 ms
16 requests, 502 KB transferred, 913 ms
16 requests, 502 KB transferred, 611 ms
16 requests, 502 KB transferred, 2090 ms
16 requests, 502 KB transferred, 790 ms
16 requests, 502 KB transferred, 640 ms
16 requests, 502 KB transferred, 689 ms
16 requests, 502 KB transferred, 658 ms
16 requests, 502 KB transferred, 605 ms
16 requests, 502 KB transferred, 3380 ms
16 requests, 502 KB transferred, 645 ms
16 requests, 502 KB transferred, 571 ms
16 requests, 502 KB transferred, 667 ms

I genomsnitt innan förändring:
16 requests, 502 KB transferred, 1.06 s
Utan 3450, 2090, 3380 blir det 721 ms

Efter förändring:
13 requests, 501 KB transferred, 751 ms
13 requests, 501 KB transferred, 748 ms
13 requests, 501 KB transferred, 572 ms
13 requests, 501 KB transferred, 671 ms
13 requests, 501 KB transferred, 695 ms
13 requests, 501 KB transferred, 592 ms
13 requests, 501 KB transferred, 473 ms
13 requests, 501 KB transferred, 553 ms
13 requests, 501 KB transferred, 507 ms
13 requests, 501 KB transferred, 473 ms
13 requests, 501 KB transferred, 709 ms
13 requests, 501 KB transferred, 506 ms
13 requests, 501 KB transferred, 557 ms
13 requests, 501 KB transferred, 635 ms
13 requests, 501 KB transferred, 584 ms
13 requests, 501 KB transferred, 510 ms
13 requests, 501 KB transferred, 632 ms
13 requests, 501 KB transferred, 536 ms
13 requests, 501 KB transferred, 491 ms
13 requests, 501 KB transferred, 597 ms

I genomsnitt efter förändring:
13 requests, 502 KB transferred, 590 ms

Jag bestämde mig för att ha en bootstrap.css och en screen.css eftersom jag
kommer använda CDN för Bootstrap senare.

Tiden att ladda sidan är nu en halv sekund och 13 requests.


# Förminska css

Enligt boken High Perfomance Web Sites tjänar man oftast inte så mycket på att
förminska (minifying) css. Men eftersom cssen kommer har kompilerats från scss
i development mode och inte production mode finns det många kommentarer och 
därför tror jag filstorleken kommer minska ganska mycket.

Innan förändring:
13 requests, 501 KB transferred, 751 ms
13 requests, 501 KB transferred, 748 ms
13 requests, 501 KB transferred, 572 ms
13 requests, 501 KB transferred, 671 ms
13 requests, 501 KB transferred, 695 ms
13 requests, 501 KB transferred, 592 ms
13 requests, 501 KB transferred, 473 ms
13 requests, 501 KB transferred, 553 ms
13 requests, 501 KB transferred, 507 ms
13 requests, 501 KB transferred, 473 ms
13 requests, 501 KB transferred, 709 ms
13 requests, 501 KB transferred, 506 ms
13 requests, 501 KB transferred, 557 ms
13 requests, 501 KB transferred, 635 ms
13 requests, 501 KB transferred, 584 ms
13 requests, 501 KB transferred, 510 ms
13 requests, 501 KB transferred, 632 ms
13 requests, 501 KB transferred, 536 ms
13 requests, 501 KB transferred, 491 ms
13 requests, 501 KB transferred, 597 ms

I genomsnitt innan förändring:
13 requests, 502 KB transferred, 590 ms

Efter förändring:
13 requests, 493 KB transferred, 718 ms
13 requests, 493 KB transferred, 683 ms
13 requests, 493 KB transferred, 540 ms
13 requests, 493 KB transferred, 633 ms
13 requests, 493 KB transferred, 492 ms
13 requests, 493 KB transferred, 481 ms
13 requests, 493 KB transferred, 640 ms
13 requests, 493 KB transferred, 656 ms
13 requests, 493 KB transferred, 495 ms
13 requests, 493 KB transferred, 725 ms
13 requests, 493 KB transferred, 555 ms
13 requests, 493 KB transferred, 480 ms
13 requests, 493 KB transferred, 511 ms
13 requests, 493 KB transferred, 577 ms
13 requests, 493 KB transferred, 492 ms
13 requests, 493 KB transferred, 493 ms
13 requests, 493 KB transferred, 513 ms
13 requests, 493 KB transferred, 625 ms
13 requests, 493 KB transferred, 575 ms
13 requests, 493 KB transferred, 686 ms

I genomsnitt efter förändring:
13 requests, 493 KB transferred, 579 ms

Det blev kanske ingen jättestor skillnad men css-filen blev hälften så stor och
det enda jag gjorde var att ändrat från development till produktion.


### Content Delivery Network

Google har CDN för ett antal js-bibliotek, så det kommer jag använda för jQuery.
Bootstrap har CDN för sin css fil som jag också tänker använda. Det kommer göra
så att fler filer kan laddas ner samtidigt och det finns stor chans att filerna
redan är chachade.

Referens är boken High Performance Web Sites kapitel fyra.

Innan förändring:
13 requests, 493 KB transferred, 718 ms
13 requests, 493 KB transferred, 683 ms
13 requests, 493 KB transferred, 540 ms
13 requests, 493 KB transferred, 633 ms
13 requests, 493 KB transferred, 492 ms
13 requests, 493 KB transferred, 481 ms
13 requests, 493 KB transferred, 640 ms
13 requests, 493 KB transferred, 656 ms
13 requests, 493 KB transferred, 495 ms
13 requests, 493 KB transferred, 725 ms
13 requests, 493 KB transferred, 555 ms
13 requests, 493 KB transferred, 480 ms
13 requests, 493 KB transferred, 511 ms
13 requests, 493 KB transferred, 577 ms
13 requests, 493 KB transferred, 492 ms
13 requests, 493 KB transferred, 493 ms
13 requests, 493 KB transferred, 513 ms
13 requests, 493 KB transferred, 625 ms
13 requests, 493 KB transferred, 575 ms
13 requests, 493 KB transferred, 686 ms

I genomsnitt innan förändring:
13 requests, 493 KB transferred, 579 ms

Efter förändring:
13 requests, 156 KB transferred, 557 ms
13 requests, 156 KB transferred, 719 ms
13 requests, 156 KB transferred, 527 ms
13 requests, 156 KB transferred, 440 ms
13 requests, 156 KB transferred, 437 ms
13 requests, 156 KB transferred, 339 ms
13 requests, 156 KB transferred, 384 ms
13 requests, 156 KB transferred, 511 ms
13 requests, 156 KB transferred, 363 ms
13 requests, 156 KB transferred, 389 ms
13 requests, 156 KB transferred, 398 ms
13 requests, 156 KB transferred, 409 ms
13 requests, 156 KB transferred, 382 ms
13 requests, 156 KB transferred, 364 ms
13 requests, 156 KB transferred, 458 ms
13 requests, 156 KB transferred, 373 ms
13 requests, 156 KB transferred, 401 ms
13 requests, 156 KB transferred, 353 ms
13 requests, 156 KB transferred, 610 ms
13 requests, 156 KB transferred, 357 ms

I genomsnitt efter förändring:
13 requests, 156 KB transferred, 442 ms

Det blev väldigt bra resultat, men antagligen inte pga jag använder CDN. Jag
gömde att jQuery och Bootstrap inte var minified. Det blev inte fler parallella
nerladdningar i Chrome. Men jag kommer ändå ha kvar det eftersom jag tror det
kommer gå fortare för en vanlig använda som har cache igång i webbläsaren.

### Minifying javascript

Jag ska ta all javascript (inte jQuery) och lägga i en fil som jag sen förminskar. Jag kommer
samtidigt lägga all javascript längst ner html-filen.

Storleken på både html och javascript kommer minska eftersom det just nu är
blandat.

Referens är boken High Performance Web Sites kapitel 8, 10 och 12.

Innan förändring:
13 requests, 156 KB transferred, 557 ms
13 requests, 156 KB transferred, 719 ms
13 requests, 156 KB transferred, 527 ms
13 requests, 156 KB transferred, 440 ms
13 requests, 156 KB transferred, 437 ms
13 requests, 156 KB transferred, 339 ms
13 requests, 156 KB transferred, 384 ms
13 requests, 156 KB transferred, 511 ms
13 requests, 156 KB transferred, 363 ms
13 requests, 156 KB transferred, 389 ms
13 requests, 156 KB transferred, 398 ms
13 requests, 156 KB transferred, 409 ms
13 requests, 156 KB transferred, 382 ms
13 requests, 156 KB transferred, 364 ms
13 requests, 156 KB transferred, 458 ms
13 requests, 156 KB transferred, 373 ms
13 requests, 156 KB transferred, 401 ms
13 requests, 156 KB transferred, 353 ms
13 requests, 156 KB transferred, 610 ms
13 requests, 156 KB transferred, 357 ms

I genomsnitt innan förändring:
13 requests, 156 KB transferred, 442 ms

Efter förändring:
12 requests, 135 KB transferred, 507 ms
12 requests, 135 KB transferred, 801 ms
12 requests, 135 KB transferred, 420 ms
12 requests, 135 KB transferred, 451 ms
12 requests, 135 KB transferred, 383 ms
12 requests, 135 KB transferred, 376 ms
12 requests, 135 KB transferred, 410 ms
12 requests, 135 KB transferred, 468 ms
12 requests, 135 KB transferred, 393 ms
12 requests, 135 KB transferred, 396 ms
12 requests, 135 KB transferred, 581 ms
12 requests, 135 KB transferred, 429 ms
12 requests, 135 KB transferred, 486 ms
12 requests, 135 KB transferred, 353 ms
12 requests, 135 KB transferred, 408 ms
12 requests, 135 KB transferred, 454 ms
12 requests, 135 KB transferred, 393 ms
12 requests, 135 KB transferred, 500 ms
12 requests, 135 KB transferred, 405 ms
12 requests, 135 KB transferred, 388 ms

I genomsnitt efter förändring:
12 requests, 135 KB transferred, 450 ms

Mess.php blev nästan hälften så stor och javascript-filen tar bara lite längre
tid att ladda än vad en javascript-fil gjorde innan och ibland mindre.

Det kan vara ett problem att javascript-filen ibland tar längre tid att ladda
ner eftersom alla javascript-filer laddades ner parallelt innan.


## Gzip

Komprimera filerna med Gzip och mod_deflate, för att filerna ska bli mindre.

Innan förändring:
12 requests, 135 KB transferred, 507 ms
12 requests, 135 KB transferred, 801 ms
12 requests, 135 KB transferred, 420 ms
12 requests, 135 KB transferred, 451 ms
12 requests, 135 KB transferred, 383 ms
12 requests, 135 KB transferred, 376 ms
12 requests, 135 KB transferred, 410 ms
12 requests, 135 KB transferred, 468 ms
12 requests, 135 KB transferred, 393 ms
12 requests, 135 KB transferred, 396 ms
12 requests, 135 KB transferred, 581 ms
12 requests, 135 KB transferred, 429 ms
12 requests, 135 KB transferred, 486 ms
12 requests, 135 KB transferred, 353 ms
12 requests, 135 KB transferred, 408 ms
12 requests, 135 KB transferred, 454 ms
12 requests, 135 KB transferred, 393 ms
12 requests, 135 KB transferred, 500 ms
12 requests, 135 KB transferred, 405 ms
12 requests, 135 KB transferred, 388 ms

I genomsnitt innan förändring:
13 requests, 135 KB transferred, 450 ms

Efter förändring:
12 requests, 112 KB transferred, 568 ms
12 requests, 112 KB transferred, 490 ms
12 requests, 112 KB transferred, 467 ms
12 requests, 112 KB transferred, 660 ms
12 requests, 112 KB transferred, 418 ms
12 requests, 112 KB transferred, 337 ms
12 requests, 112 KB transferred, 521 ms
12 requests, 112 KB transferred, 444 ms
12 requests, 112 KB transferred, 604 ms
12 requests, 112 KB transferred, 665 ms
12 requests, 112 KB transferred, 560 ms
12 requests, 112 KB transferred, 486 ms
12 requests, 112 KB transferred, 876 ms
12 requests, 112 KB transferred, 499 ms
12 requests, 112 KB transferred, 538 ms
12 requests, 112 KB transferred, 513 ms
12 requests, 112 KB transferred, 951 ms
12 requests, 112 KB transferred, 488 ms
12 requests, 112 KB transferred, 441 ms
12 requests, 112 KB transferred, 594 ms

I genomsnitt efter förändring:
12 requests, 112 KB transferred, 556 ms

23 KB mindre att ladda ner.


### En link-tag för fonts

Det finns en link-tag för varje font, och jag såg på Google Fonts att det går
att använda en tag för alla fonterna.

Innan förändring:
12 requests, 112 KB transferred, 568 ms
12 requests, 112 KB transferred, 490 ms
12 requests, 112 KB transferred, 467 ms
12 requests, 112 KB transferred, 660 ms
12 requests, 112 KB transferred, 418 ms
12 requests, 112 KB transferred, 337 ms
12 requests, 112 KB transferred, 521 ms
12 requests, 112 KB transferred, 444 ms
12 requests, 112 KB transferred, 604 ms
12 requests, 112 KB transferred, 665 ms
12 requests, 112 KB transferred, 560 ms
12 requests, 112 KB transferred, 486 ms
12 requests, 112 KB transferred, 876 ms
12 requests, 112 KB transferred, 499 ms
12 requests, 112 KB transferred, 538 ms
12 requests, 112 KB transferred, 513 ms
12 requests, 112 KB transferred, 951 ms
12 requests, 112 KB transferred, 488 ms
12 requests, 112 KB transferred, 441 ms
12 requests, 112 KB transferred, 594 ms

I genomsnitt innan förändring:
12 requests, 112 KB transferred, 556 ms

Efter förändring:
11 requests, 111 KB transferred, 681 ms
11 requests, 111 KB transferred, 500 ms
11 requests, 111 KB transferred, 518 ms
11 requests, 111 KB transferred, 664 ms
11 requests, 111 KB transferred, 556 ms
11 requests, 111 KB transferred, 575 ms
11 requests, 111 KB transferred, 470 ms
11 requests, 111 KB transferred, 611 ms
11 requests, 111 KB transferred, 455 ms
11 requests, 111 KB transferred, 432 ms
11 requests, 111 KB transferred, 602 ms
11 requests, 111 KB transferred, 771 ms
11 requests, 111 KB transferred, 687 ms
11 requests, 111 KB transferred, 407 ms
11 requests, 111 KB transferred, 805 ms
11 requests, 111 KB transferred, 595 ms
11 requests, 111 KB transferred, 416 ms
11 requests, 111 KB transferred, 768 ms
11 requests, 111 KB transferred, 687 ms
11 requests, 111 KB transferred, 634 ms

I genomsnitt efter förändring:
11 requests, 111 KB transferred, 592 ms

Det blev väldigt liten skillnad.


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

### Ladda ner databas

Databasen går att ladda ner om man kan adressen, men det är ett ganska dåligt
namn så det går säkert att gissa. Enklaste lösningen är antagligen att flytta
den någonstans som inte är tillgängligt utåt.

För mig är public_html tillgänglig men inte mappen som public_hml ligger,
därför la jag db.db där.

### Logga ut

För att logga ut måste man stänga webbläsaren. Det finns en logga ut-knapp som
inte fungerar, så om man klickar på den är man fortfarande inloggad även om man
kanske inte tror det. Och då kan någon annan använda datorn efter och posta
kommentarer som den inloggade personen.

Vid utloggning ska sessionen tas bort.
