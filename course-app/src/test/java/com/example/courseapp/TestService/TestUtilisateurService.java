package com.example.courseapp.TestService;

import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import com.example.courseapp.services.UtilisateurServiceDbImpl;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestUtilisateurService {

    @Autowired
    UtilisateurServiceDbImpl userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UtilisateurRepo userRepo;

    @Test
    @Order(1)
    public void testEmail() throws Exception {
        assertTrue(userService.testEmail("mail@gmail.com"));
    }

    @Test
    @Order(2)
    public void testEmailExisteDeja() throws Exception {
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","testUserService","testUserService@gmail.com",
                passwordEncoder.encode("mdp"), "tyrueizoapmdlf",false,
                false,true, listRole);
        userService.saveUser(user);

        assertThrows(CustomException.class, ()->{
            userService.testEmail("testUserService@gmail.com");
        });
    }

    @Test
    @Order(3)
    public void testEmailInvalid(){
        assertThrows(CustomException.class, ()->{
            userService.testEmail("mailmail@.com");
        });
    }

    @Test
    @Order(4)
    public void testMdp() throws Exception {
        assertTrue(userService.testMdp("MdpTest8"));
    }

    @Test
    @Order(5)
    public void testMdpInvalid(){
        assertThrows(CustomException.class, ()->{
            userService.testMdp("Mdp");
        });
    }

    @Test
    @Order(6)
    public void testCodeValid(){
        assertTrue(userService.testCodeValid("cvxcvxcvxcvx"));
    }

    @Test
    @Order(7)
    public void testCodeInvalid(){
        assertFalse(userService.testCodeValid("tyrueizoapmdlf"));
    }

    @Test
    @Order(8)
    public void testBlockUnLockException(){
        assertThrows(CustomException.class, ()->{
            userService.boclkUnclock(0,true);
        });
    }

    @Test
    @Order(9)
    public void testBlock() throws Exception {

        Optional<Utilisateur> userOptional = userRepo.findByEmail("testUserService@gmail.com");
        Utilisateur utilisateur = userOptional.get();

        userService.boclkUnclock(utilisateur.getId(),true);

        Optional <Utilisateur> userByID = userRepo.findById(utilisateur.getId());

        assertTrue(userByID.get().isDel());
    }

    @Test
    @Order(10)
    public void testUnlock() throws Exception {

        Optional<Utilisateur> userOptional = userRepo.findByEmail("testUserService@gmail.com");
        Utilisateur utilisateur = userOptional.get();

        userService.boclkUnclock(utilisateur.getId(),false);

        Optional <Utilisateur> userByID = userRepo.findById(utilisateur.getId());

        assertFalse(userByID.get().isDel());
    }
}
