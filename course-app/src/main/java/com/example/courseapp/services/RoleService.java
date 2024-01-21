package com.example.courseapp.services;

import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    UtilisateurRepo utilisateurRepo;

    public Utilisateur verifRole(Role role){

        // récuperation de l'email du token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        // récuperation de l'auteur de l'email
        Optional<Utilisateur> author = utilisateurRepo.findByEmail(email);

        // on vérifie que l'auteur possede bien le role
        if (author.isPresent()){
            if (!author.get().getRole().contains(role)){
                throw new CustomException("Vous n'avez pas les permissions requises.");
            } else {
                Utilisateur user = author.get();
                return user;
            }
        } else throw new CustomException("Token invalide.");

    }
}
