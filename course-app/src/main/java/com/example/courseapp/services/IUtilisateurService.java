package com.example.courseapp.services;

import com.example.courseapp.models.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface IUtilisateurService {
    /*** Utilisation d'une interface pour avoir une vue globale des méthodes du service ***/
    public List<Utilisateur> getAllUsers();
    public Optional<Utilisateur> getUserById(int id);
    public List<Utilisateur> getAllAdmins();
    public List<Utilisateur> getAllCoureurs();
    public List<Utilisateur> getAllGestionnaires();
    public Utilisateur saveUser(Utilisateur newUser);
    public void deleteById(int id);
}
