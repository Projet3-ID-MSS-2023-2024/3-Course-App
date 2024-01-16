package com.example.courseapp;

import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import com.example.courseapp.services.UtilisateurServiceDbImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestUtilisateurService {

    @Autowired
    UtilisateurServiceDbImpl userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UtilisateurRepo userRepo;

    @Test
    public void testEmail() throws Exception {
        assertTrue(userService.testEmail("mail@gmail.com"));
    }

    @Test
    public void testEmailExisteDeja() throws Exception {
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail@gmail.com",
                passwordEncoder.encode("mdp"), "fdsjhgdshgy",false,
                true,false, listRole);
        userService.saveUser(user);

        assertThrows(CustomException.class, ()->{
            userService.testEmail("mail@gmail.com");
        });
    }

    @Test
    public void testEmailInvalid(){
        assertThrows(CustomException.class, ()->{
            userService.testEmail("mailmail@.com");
        });
    }

    @Test
    public void testMdp() throws Exception {
        assertTrue(userService.testMdp("MdpTest8"));
    }

    @Test
    public void testMdpInvalid(){
        assertThrows(CustomException.class, ()->{
            userService.testMdp("Mdp");
        });
    }

    @Test
    public void testCodeValid(){
        assertTrue(userService.testCodeValid("cvxcvxcvxcvx"));
    }

    @Test
    public void testCodeInvalid(){
        List<Role> role = new ArrayList<>();
        role.add(Role.ADMIN);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail2@gmail.com",
                passwordEncoder.encode("mdp"), "untestcodecodecode",
                false, true,false, role);
        userService.saveUser(user);

        assertFalse(userService.testCodeValid("untestcodecodecode"));
    }

    @Test
    public void testBlockUnLockException(){
        assertThrows(CustomException.class, ()->{
            userService.boclkUnclock(0,true);
        });
    }

    @Test
    public void testBlock() throws Exception {
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail4@gmail.com",
                passwordEncoder.encode("mdp"), "fdsjhgdshgy",false,
                false,true, listRole);
        userService.saveUser(user);

        Optional<Utilisateur> userOptional = userRepo.findByEmail("mail4@gmail.com");
        Utilisateur utilisateur = userOptional.get();

        userService.boclkUnclock(utilisateur.getId(),true);

        Optional <Utilisateur> userByID = userRepo.findById(utilisateur.getId());

        assertTrue(userByID.get().isDel());
    }

    @Test
    public void testUnlock() throws Exception {
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail3@gmail.com",
                passwordEncoder.encode("mdp"), "fdsjhgdshgy",false,
                true,false, listRole);
        userService.saveUser(user);

        Optional<Utilisateur> userOptional = userRepo.findByEmail("mail3@gmail.com");
        Utilisateur utilisateur = userOptional.get();

        userService.boclkUnclock(utilisateur.getId(),false);

        Optional <Utilisateur> userByID = userRepo.findById(utilisateur.getId());

        assertFalse(userByID.get().isDel());
    }
}
