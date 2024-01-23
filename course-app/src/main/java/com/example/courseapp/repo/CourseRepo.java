package com.example.courseapp.repo;

import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;


public interface CourseRepo extends JpaRepository<Course, Integer> {

    /** Récupération des courses disponibles (après la date d'aujourd'hui) **/
    @Query("select c from Course c where c.date > :timestamp and c.cloturer = false and c.supprimer = false order by c.prix asc")
    public List<Course> findAvailableCourses(Timestamp timestamp);

    /** Récupération des courses disponibles (après la date d'aujourd'hui) par user **/
    @Query("select c from Course c where not exists (select r from Resultat r where r.course.id = c.id and r.utilisateur.id =:id) and c.date > :timestamp and c.cloturer = false and c.supprimer = false order by c.prix asc")
    public List<Course> findAvailableCoursesByUser(Timestamp timestamp, int id);

    /** Récupération des courses payées par user **/
    @Query("select c from Course c inner join Resultat r on r.course.id = c.id where c.supprimer = false and r.utilisateur.id =:id order by c.prix asc")
    public List<Course> findPayedCoursesByUser(int id);

    /*** Récup des courses par gestionnaire et non supprimée***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndNotDeleted(int id);

    /*** Récup des courses par gestionnaire supprimées ***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.supprimer = true")
    public List<Course> getCourseByGestionnaireAndDeleted(int id);

    /*** Récup des courses non supprimée, non cloturées par gestionnaire ***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.cloturer = false and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndNotEnded(int id);

    /*** Récup des courses non supprimée, cloturées par gestionnaire ***/
    @Query("select c from Course c where c.utilisateur.id =:id and c.cloturer = true and c.supprimer = false")
    public List<Course> getCourseByGestionnaireAndEnded(int id);

    /*** Récup des courses non supprimée qui sont terminées ***/
    @Query("select c from Course c where c.cloturer = true and c.supprimer = false")
    public List<Course> getCourseForResults();


}
