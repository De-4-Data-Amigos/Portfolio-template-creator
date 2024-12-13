package dk.lyngby.controller.impl;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dk.lyngby.config.HibernateConfig;
import dk.lyngby.dao.impl.ContactDao;
import dk.lyngby.dto.ContactDTO;
import dk.lyngby.exception.ApiException;
import dk.lyngby.model.Contact;
import io.javalin.http.Context;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceException;
import netscape.javascript.JSObject;
import org.slf4j.Logger;

public class ContactController {

    private final ContactDao contactDao;

    public ContactController() {
        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();
        contactDao = ContactDao.getInstance(emf);
    }

    // Endpoint til at gemme en kontakt
    public void saveContact(Context ctx) throws ApiException {
        try {
            ContactDTO contactDTO = ctx.bodyAsClass(ContactDTO.class);

            if (contactDTO.getName() == null || contactDTO.getEmail() == null || contactDTO.getMessage() == null) {
                throw new ApiException(400, "All fields (name, email, message) are required");
            }
            Contact contact = contactDTO.toEntity();
            contactDao.save(contact);
            JsonObject response = new JsonObject();
            response.addProperty("message", "Contact saved successfully!");
            ctx.status(201).json(new Gson().toJson(response));
        } catch (Exception e) {
            throw new ApiException(400, "Error saving contact: " + e.getMessage());
        }
    }
}
