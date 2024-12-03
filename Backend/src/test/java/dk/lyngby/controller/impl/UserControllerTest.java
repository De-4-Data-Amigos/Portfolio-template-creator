package dk.lyngby.controller.impl;

import dk.lyngby.config.ApplicationConfig;
import dk.lyngby.config.HibernateConfig;
import dk.lyngby.model.Role;
import dk.lyngby.model.User;
import io.javalin.Javalin;
import io.restassured.RestAssured;
import jakarta.persistence.EntityManagerFactory;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

class UserControllerTest {

    private static Javalin app;
    private static EntityManagerFactory emfTest;
    private static final String BASE_URL = "http://localhost:7070/api/v1/auth";

    private static final String constUsername = "newuser@gmail.com";
    private static final String constPassword = "newpassword";
    private static final String constRole = "newuser";

    @BeforeAll
    static void beforeAll() {
        HibernateConfig.setTest(true);
        emfTest = HibernateConfig.getEntityManagerFactory();
        app = Javalin.create();

        // Initialiser ruter
        app.post("/api/v1/auth/login", ctx -> new UserController().login(ctx));
        app.post("/api/v1/auth/register", ctx -> new UserController().register(ctx));

        ApplicationConfig.startServer(app, 7070);
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 7070;
    }

    @BeforeEach
    void setUp() {
        try (var em = emfTest.createEntityManager()) {
            em.getTransaction().begin();
            // Ryd databasen
            em.createQuery("DELETE FROM User").executeUpdate();
            em.createQuery("DELETE FROM Role").executeUpdate();

            // Opret testdata
            Role userRole = new Role("user");
            User testUser = new User("test@gmail.com", "test1234");
            testUser.addRole(userRole);

            em.persist(userRole);
            em.persist(testUser);

            em.getTransaction().commit();
        }
    }

    @AfterAll
    static void tearDown() {
        HibernateConfig.setTest(false);
        ApplicationConfig.stopServer(app);
    }

    @Test
    void login() {
        String loginPayload = String.format("{\"username\":\"%s\",\"password\":\"%s\"}", "test@gmail.com", "test1234");
        given()
                .contentType("application/json")
                .body(loginPayload)
                .when()
                .post(BASE_URL + "/login")
                .then()
                .statusCode(200)
                .body("username", equalTo("test@gmail.com"));


        String invalidPayload = String.format("{\"username\":\"%s\",\"password\":\"%s\"}", "test@gmail.com", "wrongpass");

        given()
                .contentType("application/json")
                .body(invalidPayload)
                .when()
                .post(BASE_URL + "/login")
                .then()
                .statusCode(401);
    }

    @Test
    void register() {
        String registerPayload = String.format(
                "{\"username\":\"%s\",\"password\":\"%s\",\"role\":\"%s\"}",
                constUsername, constPassword, constRole
        );

        given()
                .contentType("application/json")
                .body(registerPayload)
                .when()
                .post(BASE_URL + "/register")
                .then()
                .statusCode(201)
                .body("username", equalTo(constUsername));

        given()
                .contentType("application/json")
                .body(registerPayload)
                .when()
                .post(BASE_URL + "/register")
                .then()
                .statusCode(400);
    }
}
