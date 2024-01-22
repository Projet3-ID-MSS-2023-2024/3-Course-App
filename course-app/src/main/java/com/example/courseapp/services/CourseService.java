package com.example.courseapp.services;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.models.Course;
import com.example.courseapp.models.Ville;

import java.util.List;
import java.util.Optional;

/*** Mise en place de l'interface de course afin de visualiser les methodes***/
public interface CourseService {

    /*** Methode qui ajoute une course ***/
    public Course add(Course newCourse);

    /*** Méthode qui récupère toutes les courses ***/
    public List<Course> getCourses();

    /*** Méthode qui récupère les courses disponibles (à venir) ***/
    public List<Course> getAvailableCourses();

    /*** Methode qui récupère les courses non supprimées par gestionnaire ***/
    public List<Course> getCoursesByGestionnaireAndNotDeleted(int id);

    /*** Methode qui récupère les courses  supprimées par gestionnaire ***/
    public List<Course> getCoursesByGestionnaireAndDeleted(int id);

    /*** Methode qui récupère une course ***/

    public Optional<Course> getCourse(int id);

    /*** Methode qui supprime une course ***/

    public void deleteCourse(int id);

    /*** Methode qui récupère les courses non terminées par gestionnaire ***/

    public List<Course> getCoursesByGestionnaireAndNotEnded(int id);

    /*** Methode qui récupère les courses terminées par gestionnaire ***/

    public List<Course> getCoursesByGestionnaireAndEnded(int id);

    /*** Methode qui récupère les courses non supprimées et non terminées ***/

    public List<Course> getCourseEndedAndNotDeleted();

    /*** Methode qui modifie une course ***/

    public Course updateCourse(Course course);

    public Course verifAdresseVille(Adresse adresse, Ville ville, Course newCourse);

}
