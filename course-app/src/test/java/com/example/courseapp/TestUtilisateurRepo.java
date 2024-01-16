package com.example.courseapp;

import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestUtilisateurRepo {

    @Autowired
    UtilisateurRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    public void getUser(){
        List<Utilisateur> listUser = userRepo.findAll();
        assertTrue(listUser.stream().anyMatch(e -> e.getNom().equals("Bernard")));
    }

    @Test
    public void getUserId(){
        Optional<Utilisateur> user = userRepo.findById(1);
        assertTrue(user.get().getNom().contains("Bernard"));
    }

    @Test
    public void getUserDel(){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail@gmail.com", passwordEncoder.encode("mdp"), "fdsjhgdshgy",false, true,false, listRole);
        userRepo.save(user);
        List<Utilisateur> listUserDel = userRepo.getUserDel();

        assertTrue(listUserDel.stream().anyMatch(e -> e.getEmail().equals("mail@gmail.com")));
    }

    @Test
    public void getUserNoDel(){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","prenom","mail2@gmail.com", passwordEncoder.encode("mdp"), "fdsjhgdshll",false, false,true, listRole);
        userRepo.save(user);
        List<Utilisateur> listUser = userRepo.getUser();

        assertTrue(listUser.stream().anyMatch(e -> e.getEmail().equals("mail2@gmail.com")));
    }
    @Test
    public void testFindByEmail(){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","testEmail","mail3@gmail.com", passwordEncoder.encode("mdp"), "fdsjhgdshll",false, false,true, listRole);
        userRepo.save(user);

        Optional<Utilisateur> test = userRepo.findByEmail("mail3@gmail.com");
        assertTrue(test.get().getPrenom().contains("testEmail"));
    }

    @Test
    public void testFindByCode(){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);
        Utilisateur user = new Utilisateur(0, "nom","testCode","mail4@gmail.com", passwordEncoder.encode("mdp"), "aszertegfhtypo",false, false,true, listRole);
        userRepo.save(user);

        Optional<Utilisateur> test = userRepo.findByCode("aszertegfhtypo");
        assertTrue(test.get().getPrenom().contains("testCode"));
    }
    @Test
    public void testFindByPrenom(){
        Optional<Utilisateur> test = userRepo.findByPrenom("testCode");
        assertTrue(test.get().getEmail().contains("mail4@gmail.com"));
    }
}
