package com.example.courseapp.repo;

import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Integer> {

    /*** Récupération des utilisateurs en fonction de leurs roles ***/

    @Query("SELECT u FROM Utilisateur u JOIN u.role r where r = 'ADMIN' ")
    public List<Utilisateur> getAdmins();

    @Query("SELECT u FROM Utilisateur u JOIN u.role r where r = 'COUREUR' ")
    public List<Utilisateur> getCoureurs();

    @Query("SELECT u FROM Utilisateur u JOIN u.role r where r = 'GESTIONNAIRE' ")
    public List<Utilisateur> getGestionnaire();

    Optional<Utilisateur> findByEmail (String email);

    Optional<Utilisateur> findByCode (String code);
}
