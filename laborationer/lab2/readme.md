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
