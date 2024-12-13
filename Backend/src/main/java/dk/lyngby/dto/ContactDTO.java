package dk.lyngby.dto;

import dk.lyngby.model.Contact;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO {
    private String name;
    private String email;
    private String message;

    public Contact toEntity() {
        return new Contact(
                null, // `id` sættes som null, da det genereres automatisk af databasen
                this.name,
                this.email,
                this.message
        );
    }


}
