package com.example.courseapp.services;

import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurServiceDbImpl implements IUtilisateurService{

    @Autowired
    UtilisateurRepo utilisateurRepo;

    @Override
    public List<Utilisateur> getAllUsers() {
        return utilisateurRepo.findAll();
    }

    @Override
    public Utilisateur saveUser(Utilisateur newUser) {
        return utilisateurRepo.save(newUser);
    }

    @Override
    public Optional<Utilisateur> getUserById(int id) {
        return utilisateurRepo.findById(id);
    }

    @Override
    public List<Utilisateur> getAllAdmins() {
        return utilisateurRepo.getAdmins();
    }

    @Override
    public List<Utilisateur> getAllCoureurs() {
        return utilisateurRepo.getCoureurs();
    }

    @Override
    public List<Utilisateur> getAllGestionnaires() {
        return utilisateurRepo.getGestionnaire();
    }

    @Override
    public void deleteById(int id) {
        utilisateurRepo.deleteById(id);
    }
}
