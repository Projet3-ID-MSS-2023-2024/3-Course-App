package com.example.courseapp.repo;

import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Integer> {

    /*** Récupération des utilisateurs actifs ***/
    @Query("SELECT u FROM Utilisateur u where u.del = false ")
    public List<Utilisateur> getUser();
    /*** Récupération des utilisateurs supprimés logiquement ***/
    @Query("SELECT u FROM Utilisateur u where u.del = true ")
    public List<Utilisateur> getUserDel();
    Optional<Utilisateur> findByEmail (String email);
    Optional<Utilisateur> findByCode (String code);
    Optional<Utilisateur> findByPrenom(String prenom);
}
