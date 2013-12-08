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
