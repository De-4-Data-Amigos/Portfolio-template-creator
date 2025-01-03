## 1
#### Test navn
registerWithShortPassword
#### Beskrivelse
Forsøger at registrere en bruger med en adgangskode på mindre end 8 tegn
#### Forventet Resultat
HTTP 400 med beskeden "Password must be at least 8 characters long".
#### Faktisk Resultat
HTTP 400 med beskeden "Password must be at least 8 characters long".
#### Status
Bestået
## 2 
#### Test navn
Login (invalidPayload)
#### Beskrivelse
Forsøger at logge ind med forkert adgangskode for en eksisterende bruger.
#### Forventet Resultat
HTTP 401 med beskeden "Invalid username or password"
#### Faktisk Resultat
HTTP 401 med beskeden "Invalid username or password".
#### Status
Bestået

## 3
#### Test navn
registerInvalidRole
#### Beskrivelse
Forsøger at registrere en bruger uden at inkludere en rolle i payload.
#### Forventet Resultat
Registrerer en bruger med gyldige data (username, password og rolle)
#### Faktisk Resultat
HTTP 201 med en JSON-token i responsen
#### Status
Bestået

## 4 
#### Test navn
verifyUserIsPersistedInDatabaseAfterRegistration
#### Beskrivelse
Tester om en bruger, der er registreret, er korrekt gemt i databasen
#### Forventet Resultat
Brugeren skal kunne findes i databasen efter registrering, med de samme oplysninger.
#### Faktisk Resultat
Brugeren blev korrekt gemt i databasen og de samme oplysninger kunne findes
#### Status
Bestået



## Fundne fejl og rettelser:

- Den første fejl opstod i testen “registerWithShortPassword”. Her fejlede testen, JSON-responsen ikke indeholdt nøglen “error”, som forventet, men i stedet brugte nøglen “message”. Denne fejl skyldtes en misforståelse af backend-resonsens JSON-struktur. For at løse problemet blev testkoden opdateret, så den matchede den korrekte nøgle “message”.

- Den anden fejl blev fundet i testen “registerInvalidRole”. Her returnerede systemet en generisk fejlmeddelelse i stedet for den specifikke besked. “Role is required”. Årsagen til denne fejl var, at backend ikke validerede eksplicit, om rollen var inkluderet i payloaden. Løsningen var at opdatere backend, så den nu validerer, om rollen er angivet og returnerer en passende fejlmeddelelse, hvis den mangler


Eksempel på Testkode for "verifyUserIsPersistedInDatabaseAfterRegistration"




@Test

    void verifyUserIsPersistedInDatabaseAfterRegistration() {
        String payload = "{\"username\":\"newuser@gmail.com\",\"password\":\"newpassword\",\"role\":\"user\"}";

        given()
                .contentType("application/json")
                .body(payload)
                .when()
                .post(BASE_URL + "/register")
                .then()
                .statusCode(201);

        try (var em = emfTest.createEntityManager()) {
            User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                    .setParameter("username", "newuser@gmail.com")
                    .getSingleResult();
            assertNotNull(user);
            assertEquals("newuser@gmail.com", user.getUsername());
        }
    }
