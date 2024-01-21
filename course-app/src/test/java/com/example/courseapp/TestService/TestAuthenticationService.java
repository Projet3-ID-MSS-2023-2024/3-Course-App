package com.example.courseapp.TestService;

import com.example.courseapp.dto.AuthenticationRequest;
import com.example.courseapp.dto.AuthenticationResponse;
import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import com.example.courseapp.services.AuthenticationService;
import com.example.courseapp.services.UtilisateurServiceDbImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.AssertTrue;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestAuthenticationService {
    @Autowired
    AuthenticationService authService;
    @Autowired
    UtilisateurRepo userRepo;

    /*** Test de la fonction pour inscrire un simple utilisateur ***/

    @Test
    @Order(1)
    @Transactional
    public void registerUser() throws Exception {
        Utilisateur user = new Utilisateur(0,"Test","AuthServiceUser","testauthserviceuser@gmail.com",
                "User1000","",false,false,false,null);

        AuthenticationResponse response = authService.register(user, false);
        Optional<Utilisateur> getUser = userRepo.findByEmail("testauthserviceuser@gmail.com");

        // Forcer l'initialisation de la collection role
        Hibernate.initialize(getUser.get().getRole());

        assertTrue(getUser.get().getRole().contains(Role.COUREUR));
        assertFalse(getUser.get().isDel());
        assertFalse(response.getToken().isEmpty());
    }

    /*** Test de la fonction pour inscrire un administrateur ***/

    @Test
    @Order(2)
    @Transactional
    public void registerAdmin() throws Exception {
        Utilisateur user = new Utilisateur(0,"Test","AuthServiceAdmin","testauthserviceadmin@gmail.com",
                "User1000","",false,false,false,null);

        AuthenticationResponse response = authService.register(user, true);
        Optional<Utilisateur> getUser = userRepo.findByEmail("testauthserviceadmin@gmail.com");

        // Forcer l'initialisation de la collection role
        Hibernate.initialize(getUser.get().getRole());

        assertTrue(getUser.get().getRole().contains(Role.ADMIN));
        assertFalse(getUser.get().isDel());
        assertFalse(response.getToken().isEmpty());
    }

    /*** Test de la fonction pour confirmer une inscription ***/

    @Test
    @Order(3)
    public void confirmInscription() throws Exception {
        Utilisateur user = new Utilisateur(0,"Test","AuthService",
                "testauthservice@gmail.com", "User1000","",
                false,false,false,null);

        authService.register(user, false);
        Optional<Utilisateur> getUser = userRepo.findByEmail("testauthservice@gmail.com");
        Boolean response = authService.confirmInscription(getUser.get().getCode());

        assertTrue(response);
    }

    /*** Test de la fonction pour confirmer une inscription qui a déja été confirmée ***/

    @Test
    @Order(4)
    public void confirmInscription2fois() throws Exception {
        Optional<Utilisateur> getUser = userRepo.findByEmail("testauthservice@gmail.com");

        assertThrows(CustomException.class, ()->{
            authService.confirmInscription(getUser.get().getCode());
        });
    }

    /*** Test de la fonction pour se connecter en entrant des informations correctes ***/

    @Test
    @Order(5)
    public void authenticate() {

        ResponseEntity<AuthenticationResponse> response = authService.authenticate(
                AuthenticationRequest.builder()
                        .email("testauthservice@gmail.com")
                        .mdp("User1000")
                        .build()
        );
        assertFalse(response.getBody().getToken().isEmpty());
    }

    /*** Test de la fonction pour se connecter en entrant des informations incorrectes ***/

    @Test
    @Order(6)
    public void authenticateFail() {

        assertThrows(BadCredentialsException.class, ()->{
            authService.authenticate(
                    AuthenticationRequest.builder()
                            .email("testauthservice@gmail.com")
                            .mdp("User")
                            .build()
            );
        });
    }

}
