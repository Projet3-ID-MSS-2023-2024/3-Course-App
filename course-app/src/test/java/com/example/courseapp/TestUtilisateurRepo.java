package com.example.courseapp;

import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestUtilisateurRepo {

    @Autowired
    UtilisateurRepo userRepo;

    @Test
    public void getUser(){
        List<Utilisateur> listUser = userRepo.findAll();
        assertTrue(listUser.size()==1);
    }

    @Test
    public void getUserId(){
        Optional<Utilisateur> user = userRepo.findById(1);
        assertTrue(user.get().getNom().contains("Bernard"));
    }

    @Test
    public void getAdmin(){
        List<Utilisateur> listAdmin = userRepo.getAdmins();
        assertTrue(listAdmin.size()==1);
    }

    @Test
    public void getCoureur(){
        List<Utilisateur> listCoureur = userRepo.getCoureurs();
        assertTrue(listCoureur.size()==1);
    }

    @Test
    public void getgestionnaire(){
        List<Utilisateur> listGestionnaire = userRepo.getGestionnaire();
        assertTrue(listGestionnaire.size()==0);
    }
}
