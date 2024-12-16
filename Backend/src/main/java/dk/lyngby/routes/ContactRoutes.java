package dk.lyngby.routes;

import dk.lyngby.controller.impl.ContactController;
import dk.lyngby.security.RouteRoles;
import io.javalin.apibuilder.EndpointGroup;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

public class ContactRoutes {
    private final ContactController contactController = new ContactController();


        protected EndpointGroup getRoutes() {
            return () -> {
                post("/save", contactController::saveContact, RouteRoles.ANYONE);
            };
        }
    }
