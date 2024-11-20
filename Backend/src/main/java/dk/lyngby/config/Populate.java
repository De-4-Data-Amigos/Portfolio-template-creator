package dk.lyngby.config;


import dk.lyngby.model.Role;
import dk.lyngby.model.User;
import jakarta.persistence.EntityManagerFactory;
import org.jetbrains.annotations.NotNull;
import java.util.Set;

public class Populate {
    public static void main(String[] args) {

        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();
        User u1 = new User("John@gmail.com", "123456789");


        try (var em = emf.createEntityManager()) {

            em.getTransaction().begin();
            u1.addRole(new Role("user"));
            em.persist(u1);
            em.getTransaction().commit();
        }
    }

    @NotNull
    private static Set<User> getCalRooms() {

        return null;
    }

    @NotNull
    private static Set<Role> getHilRooms() {

        return null;
    }
}