package com.example.courseapp.services;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.models.Ville;
import com.example.courseapp.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService{

    /*** initialisation du repo ***/
    @Autowired
    CourseRepo courseRepo;
    @Autowired
    AdresseService adresseService;
    @Autowired
    VilleService villeService;

    /*** Ajout de course ***/
    @Override
    public Course add(Course newCourse) {
        return courseRepo.save(newCourse);
    }

    /*** Récupération de toutes les courses ***/
    @Override
    public List<Course> getCourses() {
        return courseRepo.findAll();
    }

    /*** Récupération des courses disponibles (à venir) ***/
    public List<Course> getAvailableCourses() {
        // Timestamp de la date actuelle pour les courses à venir
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return courseRepo.findAvailableCourses(timestamp);
    }

    /*** Récupération des courses disponibles (à venir) par user ***/
    public List<Course> getAvailableCoursesByUser(int id) {
        // Timestamp de la date actuelle pour les courses à venir
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return courseRepo.findAvailableCoursesByUser(timestamp, id);
    }

    /*** Récupération des courses payées par utilisateur ***/
    public List<Course> getPayedCoursesByUser(int id) {
        // Timestamp de la date actuelle pour les courses à venir
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return courseRepo.findPayedCoursesByUser(id);
    }

    /*** Récupération des courses non supprimées par gestionnaire ***/
    @Override
    public List<Course> getCoursesByGestionnaireAndNotDeleted(int id) {
        return courseRepo.getCourseByGestionnaireAndNotDeleted(id);
    }

    /*** Récupération des courses supprimées par gestionnaire ***/
    @Override
    public List<Course> getCoursesByGestionnaireAndDeleted(int id) {
        return courseRepo.getCourseByGestionnaireAndDeleted(id);
    }

    /*** Récupération des courses non terminées par gestionnaire ***/

    @Override
    public List<Course> getCoursesByGestionnaireAndNotEnded(int id) {
        return courseRepo.getCourseByGestionnaireAndNotEnded(id);
    }

    /*** Récupération des courses terminées par gestionnaire ***/
    @Override
    public List<Course> getCoursesByGestionnaireAndEnded(int id) {
        return courseRepo.getCourseByGestionnaireAndEnded(id);
    }

    /*** Récupération des courses non supprimées et non terminées ***/

    @Override
    public List<Course> getCourseEndedAndNotDeleted() {
        return courseRepo.getCourseForResults();
    }

    /*** Récupération d'une course ***/

    @Override
    public Optional<Course> getCourse(int id) {
        return courseRepo.findById(id);
    }

    /*** Suppression logique d'une course ***/

    @Override
    public void deleteCourse(int id) {
        Optional<Course> courseDel = courseRepo.findById(id);
        Course course = Course.builder()
                .id(courseDel.get().getId())
                .titre(courseDel.get().getTitre())
                .date(courseDel.get().getDate())
                .heure(courseDel.get().getHeure())
                .prix(courseDel.get().getPrix())
                .adresse1(courseDel.get().getAdresse1())
                .adresse(courseDel.get().getAdresse())
                .utilisateur(courseDel.get().getUtilisateur())
                .cloturer(courseDel.get().isCloturer())
                .supprimer(true)
                .build();
        courseRepo.save(course);
    }

    /*** Modification d'une course ***/

    @Override
    public Course updateCourse(Course course) {
        return courseRepo.save(course);
    }

    @Override
    public Course verifAdresseVille(Adresse adresse, Ville ville, Course newCourse) {
        Adresse testAdresse = adresseService.getAdresseByLatLong(
                adresse.getLatitude(),adresse.getLongitude());
        Ville testVille = villeService.getVilleByNom(ville.getNom());
        if (testAdresse==null){
            if (testVille == null) {
                villeService.add(ville);
            } else {
                newCourse.getAdresse().setVille(testVille);
                adresse.setVille(testVille);
            }
            adresseService.add(adresse);
        } else {
            newCourse.setAdresse(testAdresse);
        }
        return newCourse;
    }
}
