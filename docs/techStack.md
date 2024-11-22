## Backend
### Database:
#### PostgreSQL

#### Hvorfor vi bruger det:
Vi har valgt PostgreSQL som vores database, da vi har arbejdet med det tidligere i vores uddannelse og derfor har god erfaring med det. Det er en robust og pålidelig database, som understøtter de avancerede funktioner, vi har brug for i vores projekt. Desuden er det gratis og open source, hvilket gør det til et oplagt valg for os.

•	Fordele:
-	Gratis og open source, så vi har fuld adgang til det uden omkostninger.
-	Kan håndtere komplekse relationer og queries, hvilket er nødvendigt for vores projekt.
-	Stabil og skalerbar til både små og store systemer.

•	Ulemper:
-	 Det kan være lidt mere komplekst at sætte op sammenlignet med mere simple løsninger som SQLite..

•	Alternativ:  MySQL og MongoDB

#### MySQL:
•	Fordele: 
-	Let at komme i gang med og godt understøttet, men mangler nogle avancerede funktioner som fuld tekstsøgning.
•	Ulemper:
-	Mangler nogle af de mere avancerede funktioner, som PostgreSQL tilbyder, såsom fuld tekstsøgning og bedre understøttelse af komplekse queries.
-	Mindre effektiv i situationer med høj parallelitet.

#### MongoDB:

•	Fordele:
-	En NoSQL-database, der er rigtig god til projekter med fleksible eller ustrukturerede datastrukturer.

•	Ulemper:
-	Mangler den relationelle struktur og transaktionsstøtte, som ofte kræves i komplekse applikationer.
-	Kræver en anderledes tilgang til datahåndtering, som kan kræve mere læring.



## Java med JDK 17
#### Hvorfor vi bruger det:
Vi har valgt Java, fordi det er det sprog, vi har lært mest om under vores uddannelse, og som vi føler os mest komfortable med. Valget af JDK 17, som er en LTS-version (Long-Term Suppor) sikrer stabilitet og understøttelse på længere sigt. Java er desuden ideelt til at bygge komplekse backend-systemer, hvor skalerbarhed og ydeevne er vigtige.

•	Fordele:
-	Platform-uafhængigt: Kode kan køre på tværs af forskellige operativsystemer Med Java Virtual Machine (JVM).
-	Stabilitet: Java er kendt for sin robusthed og evne til at håndtere store datamængder.
-	Modent sprog: Mange virksomheder bruger Java, hvilket giver adgang til et stort økosystem af ressourcer.

•	Ulemper:
-	Kræver ofte mere kode end sprog som Python til simple opgaver.
-	Java-applikationer kan være mere ressourcekrævende.

•	Alternativer: Python. Node.js og C#

#### Python:
•	Fordele: 
-	Python er hurtigt at udvikle i og har et enkelt og læsbart syntax. Det er godt til små til mellemstore applikationer.

•	Ulemper: 
-	Python mangler Java’s ydeevne og skalerbarhed til store, komplekse systemer.
Node.js:
•	Fordele:  
-	Node.js er hurtigt og letvægt, hvilket gør det ideelt til applikationer med mange samtidige forbindelser, som realtidsapplikationer.
•	Ulemper: 
-	Mangler den samme robusthed og stabilitet som Java i enterprise-niveau applikationer.
C#:
•	Fordele:  
-	C# er meget populært inden for enterprise og er godt integreret med Microsoft-økosystemet. Det tilbyder stærk typning og høj ydeevne.

•	Ulemper:  
-	Det er bundet tæt til Windows-økosystemet, selvom der er muligheder som .NET Core til multiplatform-udvikling.


## Javalin 
#### Hvorfor vi bruger det:
Vi har valgt Javalin, fordi det er letvægt og simpelt, og vi har tidligere erfaring med det fra vores undervisning. Det gør det hurtigt at bygge REST API'er uden for meget konfiguration.

•	Fordele:
-	Brugervenligt og nemt at komme i gang med.
-	Kræver minimal opsætning.
•	Ulemper:       
-	Begrænset funktionalitet sammenlignet med Spring Boot.
•	Alternativ: Spring Boot og Tomcat

#### Tomcat:
•	Fordele:
-	Velkendt og meget udbredt servlet-container.
-	God til mindre applikationer og projekter, der ikke kræver så mange konfigurationer.
-	Stort community og mange ressourcer.

•	Ulemper:
-	Mindre moderne og kan kræve mere manuel konfiguration.
-	Ikke så hurtigt at sætte op til REST API'er sammenlignet med Javalin.

#### Spring Boot:
Fordele:
-	Meget omfattende og godt til større projekter, men kræver mere læring og opsætning.
-	Indbygget understøttelse af sikkerhed, dataadgang, RESTful APIs og meget mere.

Ulemper:
-	Kan være overvældende for små projekter eller teams med mindre erfaring.
-	Mere komplekst at lære og konfigurere i forhold til Javalin.

## Jackson og Gson 
#### Hvorfor vi bruger det:
Begge biblioteker bruges til JSON-håndtering, som vi allerede kender fra tidligere projekter. De gør det nemt at konvertere data mellem backend og frontend.


•	Fordele:
-	Jackson: Hurtigt og fleksibelt til komplekse datastrukturer.
-	Gson: Enkel og let at bruge til mindre opgaver.

•	Ulemper: 
-	At bruge begge biblioteker kan virke overflødigt, hvis vi kun har brug for én løsning.
•	Alternativ: Moshi

#### Moshi
•	Fordele:
-	Et lettere og nyere bibliotek, som kan være hurtigere og enklere at bruge.
-	Velegnet til mobilapplikationer og mindre projekter med JSON-håndtering.

•	Ulemper:
-	Har ikke lige så mange funktioner og konfigurationsmuligheder som Jackson.
-	Mindre community og færre ressourcer til fejlsøgning og hjælp.

## Lombok
#### Hvorfor vi bruger det:
Lombok sparer os tid ved at generere kode som getters, setters og constructors automatisk. Det er noget, vi er vant til fra tidligere projekter.

•	Fordele: 
-	Mindre kode og hurtigere udvikling.

•	Ulemper: 
-	Debugging kan være mere besværligt.

## Nimbus JOSE JWT
#### Hvorfor vi bruger det:
Nimbus gør det nemt at implementere JWT-sikkerhed, som vi allerede har erfaring med fra undervisningen.

•	Fordele: 
-	Sikker og nem håndtering af tokens.

•	Ulemper: 
-	Kræver kendskab til kryptografiske koncepter.


## Test Libraries (JUnit, Hamcrest, Testcontainers, Rest-Assured)

#### Hvorfor vi bruger dem:
Vi har tidligere brugt disse biblioteker til at skrive tests i undervisningen. De sikrer, at vores kode fungerer korrekt, og giver mulighed for automatiserede tests.

•	Fordele: 
-	Effektiv og pålidelig testning.

•	Ulemper: 
-	Kræver ekstra tid og ressourcer.
•	Alternativer: 
-	Spock Framework (mere læsbar syntaks, men kræver Groovy).

# Frontend

## JavaScript (JS)
#### Hvorfor vi bruger det:
JavaScript er standarden inden for frontend-udvikling og giver os mulighed for at bygge dynamiske, interaktive brugergrænseflader. Det er et sprog, vi allerede har erfaring med fra tidligere projekter, hvilket gør det til et naturligt valg. JavaScript gør det muligt at udvikle hurtigt og effektivt, samtidig med at det tilbyder en fleksibel platform til at integrere andre teknologier.

•	Fordele:
-	Meget fleksibelt og udbredt: JavaScript fungerer på tværs af browsere og har en stort brugerbase, hvilket gør det nemt at finde hjælp og ressourcer.
-	Understøtter både frontend og backend: Ved brug af Node.js kan det bruges som et full-stack værktøj.
-	Stort community: Mange værktøjer, biblioteker og tutorials gør det let at finde løsninger og udvide funktionalitet

•	Ulemper:
-	Fejlsøgning kan være udfordrende: Da JavaScript er løst typet, kan fejl være svære at finde fejl under udvikling.
-	Ydelse: Kan være langsommere end nogle andre sprog i visse tunge applikationer.
•	Alternativer: TypeScript og Python


#### TypeScript:
•	Fordele: 
-	En superset af JavaScript, der introducerer statisk typning, hvilket gør det lettere at skrive robuste og fejlfrie applikationer.

•	Ulemper: 
-	Kræver mere opsætning og har en stejlere læringskurve.

#### Python

•	Fordele: 
-	Gør det muligt at skrive frontend-kode i Python, som nogle udviklere finder mere intuitivt.
•	Ulemper:
-	 Det er mindre udbredt til frontend og har færre ressourcer end JavaScript.

## React

#### Hvorfor vi bruger det:
React var et naturligt valg for os, da vi har erfaring med det fra tidligere projekter. Det komponentbaserede design giver os mulighed for at genbruge kode og organisere vores applikationers struktur effektivt. Med React får vi også adgang til et stort community og et væld af tredjepartsbiblioteker og værktøjer, som gør udviklingen lettere.

•	Fordele:
-	Hurtigt og effektivt: Virtual DOM sikrer, at kun de ændrede dele af brugergrænsefladen bliver opdateret, hvilket giver høj ydeevne.
-	Komponentbaseret arkitektur: Koden bliver mere modulær og genanvendelig, hvilket sparer tid og reducerer fejl.
-	Stort community: Mange ressourcer og biblioteker som gør det nemt at tilføje funktionalitet.

•	Ulemper:
-	Stejl indlæringskurve: For nye udviklere kan det være udfordrende at forstå begreber som state management og props.
-	Behov for ekstra værktøjer: Vi skal bruge ekstra værktøjer som React Router til routing og Redux eller Context API til state management, hvilket kan være en udfordring.
•	Alternativer: Angular og Vue.js


#### Angular:
•	Fordele:
-	 Et omfattende framework, der tilbyder en komplet løsning til store applikationer.

•	Ulemper: 
-	Mere komplekst og tungere end React, hvilket kan kræve mere tid til læring og opsætning.

#### Vue.js:
•	Fordele: 
-	Letvægt, nemt at bruge og hurtigt at lære. Godt til små til mellemstore projekter.

•	Ulemper: 
-	Mindre udbredt end React, hvilket betyder et mindre community og færre ressourcer.

## Test Dependencies:

Identity-Obj-Proxy
-	Bruges til at mocke CSS-moduler under test, hvilket hjælper os med at isolere vores tests fra styling.

## Jest:
#### Hvorfor vi bruger det:
Jest er et kraftfuldt testframework, der gør det let at skrive og køre tests.
•	Fordele:
-	Hurtigt og simpelt at bruge.
-	Understøtter snapshot tests, som er nyttige til React-komponenter.

Testing Library
Hvorfor vi bruger det:
Testing Library bruges til at teste React-komponenter og sikrer, at de opfører sig som forventet i forskellige scenarier.

•	Fordele: 
-	Fokus på test af brugeroplevelsen frem for implementeringen.
•	Ulemper: 
-	Kan være lidt langsommere end andre testværktøjer.


## Vite
#### Hvorfor vi bruger det:
Vite er en moderne build-tool der er hurtig og effektiv til udvikling af JavaScript-applikationer. Vi bruger det til at håndtere vores React-projekt, fordi det tilbyder en bedre udviklingsoplevelse sammenlignet med traditionelle værktøjer som Create React App (CRA). Det understøtter hot module replacement (HMR), hvilket gør det nemt at se ændringer med det samme.

•	Fordele:
-	Hastighed: Vite er ekstremt hurtigt, især ved opstart af projekter da det bruger esbuild til at behandle JavaScript og TypeScript.
-	Hot Module Replacement (HMR): Ændringer i koden bliver straks reflekteret i browseren, hvilket gør udviklingsprocessen hurtigere.
-	Moderne funktioner: Vite understøtter natively moderne ES-moduler hvilket forbedrer ydeevnen.
-	Letvægt: Mindre kompleksitet og færre afhængigheder sammenlignet med CRA.
-	Fleksibilitet: Understøtter forskellige frameworks som React og Vue

•	Ulemper:
-	Læringskurve: Selvom det er nemt at komme i gang med kan nogle af de mere avancerede konfigurationer være komplekse for nybegyndere.
-	Ikke så udbredt som Webpack: Færre tutorials og community support sammenlignet med ældre værktøjer som Webpack.
-	Kompatibilitet: Ældre browsere eller projekter kan kræve ekstra opsætning for at fungere korrekt med Vite.
•	Alternativer: Create React App (CRA), Webpack og Parcel

### Create React App (CRA):
•	Fordele: 
-	Standardværktøjet til hurtigt at opsætte React-projekter med minimal opsætning.
•	Ulemper: 
-	Langsommere byggetider og mindre fleksibilitet sammenlignet med Vite.
### Webpack:
•	Fordele: 
-	Et kraftfuldt og udbredt bundling-tool med mange funktioner og stor tilpasningsevne.
•	Ulemper: 
-	Kræver mere opsætning og kan være langsommere i udviklingsfasen.

### Parcel:
•	Fordele: 
-	Letvægt og enkel at bruge, med minimal konfiguration og hurtige byggetider.
•	Ulemper: 
-	Ikke altid lige så hurtigt eller fleksibelt som Vite især for større projekter.

## Konklusion
Vi har valgt vores tech stack med udgangspunkt i de teknologier vi allerede har arbejdet med i undervisningen og som vi har størst kendskab til. Det gør at vi kan arbejde mere effektivt og fokusere på at skabe et produkt der opfylder projektets krav.

På frontenden har vi valgt React fordi det giver os mulighed for at bygge en fleksibel og dynamisk brugerflade. Vi har tidligere brugt React i andre projekter, så vi ved hvordan vi skal få det til at fungere. Selvfølgelig kunne vi også have brugt alternativer som Angular eller Vue men vi føler at React passer bedst til vores behov og vores erfaring.

På backenden har vi valgt Java med JDK 17 og Javalin som framework fordi det giver os den stabilitet og ydeevne vi har brug for. Det er også et sprog og en teknologi vi kender godt hvilket gør det lettere for os at komme i gang. Alternativer som Spring Boot eller C# kunne have været spændende, men de ville kræve mere tid at lære og vi skal også tage hensyn til den tid vi har til rådighed.

Alt i alt har vi valgt en tech stack der passer godt til både vores kompetencer og projektets mål. Det har været vigtigt for os at arbejde med noget vi allerede kender så vi kan bruge vores tid på at udvikle og forbedre projektet i stedet for at bruge tid på at lære helt nye teknologier fra bunden.


