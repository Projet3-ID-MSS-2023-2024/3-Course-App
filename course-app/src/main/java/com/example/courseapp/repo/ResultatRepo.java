package com.example.courseapp.repo;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ResultatRepo extends JpaRepository<Resultat, Integer> {

    /*** Récup des résultats d'un course ***/
    @Query("select r from Resultat r where r.course.id =:id")
    public List<Resultat> getAllByIdCourse(int id);

    /*** Récup des résultats d'un course (abandon) ***/
    @Query("select r from Resultat r where r.course.id =:id and temps = null")
    public List<Resultat> getAllByIdCourseAndAbandon(int id);

    /*** Récup des résultats d'un course ***/
    @Query("select r from Resultat r where r.course.id =:id and abandon = null ORDER BY temps ASC")
    public List<Resultat> getAllByIdCourseNotAbandon(int id);

    /*** Récupération des résultats pour un utilisateur ***/
    public List<Resultat> findAllByUtilisateur(Optional<Utilisateur> user);
}
