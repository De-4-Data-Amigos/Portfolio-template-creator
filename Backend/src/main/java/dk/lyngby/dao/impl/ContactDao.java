package dk.lyngby.dao.impl;
import dk.lyngby.model.Contact;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;


public class ContactDao {
    private static ContactDao instance;
    private static EntityManagerFactory emf;


    // Singleton pattern
    public static ContactDao getInstance(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new ContactDao();
        }
        return instance;
    }

    // Save metode til at gemme en kontakt
    public void save(Contact contact) {
        try (EntityManager em = emf.createEntityManager()) {
            em.getTransaction().begin();
            em.persist(contact);
            em.getTransaction().commit();
        } catch (Exception e) {
            System.out.println("Error in saving contact: " + e.getMessage()); // Log fejl
            throw new RuntimeException("Could not save contact: " + e.getMessage(), e);
        }

    }

}
