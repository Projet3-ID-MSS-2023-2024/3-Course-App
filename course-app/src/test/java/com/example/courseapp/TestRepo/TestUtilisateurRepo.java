package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
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

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestUtilisateurRepo {

    @Autowired
    UtilisateurRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    /*** Ajout d'un utilisateur supprimé dans la db pour vérifier sa présence
       dans la liste des utilisateurs supprimés ***/
    @Test
    @Order(1)
    public void getUserDel(){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","testRepo","testuserrepo@gmail.com",
                passwordEncoder.encode("mdp"), "fdsjhgdshgy",false, true,
                false, listRole);
        userRepo.save(user);
        List<Utilisateur> listUserDel = userRepo.getUserDel();

        assertTrue(listUserDel.stream().anyMatch(e -> e.getEmail().equals("testuserrepo@gmail.com")));
    }

    /*** On modifie l'utilisateur ajouté dans le premier test pour que celui-ci ne soit plus supprimé
        pour vérifier sa présence dans la liste des utilisateurs actifs ***/

    @Test
    @Order(2)
    public void getUserNoDel(){
        Optional<Utilisateur> getUser = userRepo.findByEmail("testuserrepo@gmail.com");
        Utilisateur user = getUser.get();
        user.setDel(false); user.setActive(true);
        userRepo.save(user);
        List<Utilisateur> listUser = userRepo.getUser();

        assertTrue(listUser.stream().anyMatch(e -> e.getEmail().equals("testuserrepo@gmail.com")));
    }

    /*** On vérifie que notre utilisateur se trouve bien dans la liste de tous les utilisateurs ***/

    @Test
    @Order(3)
    public void getUser(){
        List<Utilisateur> listUser = userRepo.findAll();
        assertTrue(listUser.stream().anyMatch(e -> e.getPrenom().equals("testRepo")));
    }

    /*** Test de la fonction pour récupérer un utilisateur avec son ID ***/

    @Test
    @Order(4)
    public void getUserId(){
        Optional<Utilisateur> getID = userRepo.findByEmail("testuserrepo@gmail.com");
        Optional<Utilisateur> user = userRepo.findById(getID.get().getId());
        assertTrue(user.get().getPrenom().contains("testRepo"));
    }

    /*** Test de la fonction pour récupérer un utilisateur avec son adresse email ***/

    @Test
    @Order(5)
    public void testFindByEmail(){
        Optional<Utilisateur> test = userRepo.findByEmail("testuserrepo@gmail.com");
        assertTrue(test.get().getPrenom().contains("testRepo"));
    }

    /*** Test de la fonction pour récupérer un utilisateur avec son code ***/

    @Test
    @Order(6)
    public void testFindByCode(){
        Optional<Utilisateur> test = userRepo.findByCode("fdsjhgdshgy");
        assertTrue(test.get().getPrenom().contains("testRepo"));
    }

    /*** Test de la fonction pour récupérer un utilisateur avec son prenom ***/

    @Test
    @Order(7)
    public void testFindByPrenom(){
        Optional<Utilisateur> test = userRepo.findByPrenom("testRepo");
        assertTrue(test.get().getEmail().contains("testuserrepo@gmail.com"));
    }
}
