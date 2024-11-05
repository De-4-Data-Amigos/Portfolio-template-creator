package dk.lyngby.config;


import dk.lyngby.model.Role;
import dk.lyngby.model.User;
import jakarta.persistence.EntityManagerFactory;
import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;
import java.util.Set;

public class Populate {
    public static void main(String[] args) {

        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();


        try (var em = emf.createEntityManager()) {
            em.getTransaction().begin();

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
