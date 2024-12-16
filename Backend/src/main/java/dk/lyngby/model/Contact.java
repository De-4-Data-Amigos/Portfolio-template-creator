package dk.lyngby.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 500)
    private String message;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Contact contact)) return false;
        return Objects.equals(getId(), contact.getId()) && Objects.equals(getName(), contact.getName()) && Objects.equals(getEmail(), contact.getEmail()) && Objects.equals(getMessage(), contact.getMessage());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getEmail(), getMessage());
    }
}
