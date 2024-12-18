## Forklaring af Sekvensdiagrammet
For at forstå, hvordan login-processen fungerer i vores system, har vi analyseret sekvensdiagrammet genereret af IntelliJ og reflekteret over de trin, der er involveret. Her er en detaljeret gennemgang af flowet:

### 1.	Actor: Brugeren
- Brugeren starter processen ved at forsøge at logge ind gennem vores frontend-applikation. De indtaster deres brugernavn og adgangskode i loginformularen og sender forespørgslen.

### 2.	UserController
Når forespørgslen når backend, bliver den håndteret af UserController. Denne klasse er ansvarlig for at koordinere alle trin i login-processen

- Trin 1.1: getUserInfors:

Det første, der sker, er at vi indhenter brugerens oplysninger. For at gøre dette parses JSON-objektet (via parseJsonObject), som indeholder brugerens loginoplysninger.

- Trin 1.2: getVerifiedOrRegisterUser

Herefter verificerer vi, om brugeren allerede er registreret og har korrekte loginoplysninger, eller om de skal registreres som nye brugere.

- Trin 1.3: getToken

Hvis brugeren bliver verificeret, genererer vi en sikkerhedstoken via createToken. Dette er nødvendigt for at give brugeren adgang til vores system.

- Trin 1.4: createResponse

Til sidst oprettes en HTTP-respons, som sendes tilbage til brugeren, og indeholder det nødvendige for at logge ind med succes.

 ### 3.	TokenFactory
TokenFactory er ansvarlig for at oprette sikkerhedstokens. Her ser vi flere vigtige trin:

- Trin 1.1.1.1 og 1.1.1.2: <create>

Tokenet oprettes med unikke og sikre metoder for at sikre, at brugeren kun har adgang med en gyldig token.

 ### 4.	ApiException
Hvis der opstår en fejl i processen, fx hvis brugeren ikke eksisterer eller adgangskoden er forkert, kastes en ApiException. Dette sikrer, at fejlene bliver håndteret korrekt.

 ### 5.	UseDao
#### UseDao er klassen der håndterer interaktionen med databasen.

- Trin 1.2.1: registerUser:

Hvis brugeren ikke allerede eksisterer registreres de her.

- Trin 1.2.1.1 - 1.2.1.3: <<create>>, createRole, addRole

Når brugeren registreres oprettes deres profil og deres rolle tildeles (fx som bruger, administrator eller manager). Rollen bliver tilføjet til brugeren.

- Trin 1.2.2: getVerifiedUser

Hvis brugeren allerede eksisterer, verificerer vi deres loginoplysninger. Dette inkluderer en sikkerhedskontrol, hvor adgangskoden bliver tjekket gennem verifyPassword.

 ### 6.	SignVerifyToken
Når brugeren er verificeret skal tokenet signeres for at sikre dets gyldighed.

- Trin 1.3.1.1: signToken

Dette trin sikrer, at tokenet er korrekt og kan bruges til fremtidige forespørgsler.

- Trin 1.3.1.1.1 - 1.3.1.1.3: createClaims, createHeaderAndPayload, signTokenWithSecretKey

Her oprettes claim-data (som beskriver, hvad tokenet repræsenterer), samt header og payload, før tokenet endelig signeres med en hemmelig nøgle.

### 7.	Role og AuthorizationException
Hvis brugeren ikke har de nødvendige rettigheder, kastes en AuthorizationException. Dette sikrer, at kun autoriserede brugere kan logge ind.

## Konklusion
Login-processen i vores system er designet med en klar struktur og sikkerhed i fokus. Hver komponent spiller en vigtig rolle i at sikre, at kun autoriserede brugere får adgang til vores applikation. Det er nyttigt at se, hvordan sekvensdiagrammet hjælper med at visualisere de mange trin, og det har hjulpet os med at forstå, hvordan backend og sikkerhed fungerer i praksis.
