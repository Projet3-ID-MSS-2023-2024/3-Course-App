package com.example.courseapp.repo;

import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;


public interface CourseRepo extends JpaRepository<Course, Integer> {
    /** Récupération des courses disponibles (après la date d'aujourd'hui) **/
    @Query("select c from Course c where c.date >= :timestamp")
    public List<Course> findAvailableCourses(Timestamp timestamp);

    /*** Récup des courses par gestionnaire***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndNotDeleted(int id);
}
