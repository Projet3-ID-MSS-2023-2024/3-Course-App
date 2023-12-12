package com.example.courseapp.repo;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ResultatRepo extends JpaRepository<Resultat, Integer> {

    /*** Récup des résultats d'un course***/
    @Query("select r from Resultat r where r.course.id =:id")
    public List<Resultat> getAllByIdCourse(int id);

    public List<Resultat> findAllByUtilisateur(Optional<Utilisateur> user);
}
