package com.example.courseapp.repo;

import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CourseRepo extends JpaRepository<Course, Integer> {

    /*** Récup des courses par gestionnaire et non supprimée***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndNotDeleted(int id);

    /*** Récup des courses non supprimée***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.cloturer = false and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndNotEnded(int id);
}
