package com.example.courseapp.services;

import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface IUtilisateurService {
    /*** Utilisation d'une interface pour avoir une vue globale des méthodes du service ***/
    public List<UserResponse> getAllUsers();
    public Optional<Utilisateur> getUserById(int id);
    public List<Utilisateur> getAllAdmins();
    public List<Utilisateur> getAllCoureurs();
    public List<Utilisateur> getAllGestionnaires();
    public Utilisateur saveUser(Utilisateur newUser);
    public void deleteById(int id);
    public boolean testEmail(String email) throws Exception;
    public boolean testMdp(String mdp) throws Exception;
    public boolean testCodeValid(String code);
    public Optional<Utilisateur> getUserByCode(String code);
    public void addUserbyAdmin(Utilisateur user) throws Exception;
}
