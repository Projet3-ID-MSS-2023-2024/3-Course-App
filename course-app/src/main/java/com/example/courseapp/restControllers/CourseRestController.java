package com.example.courseapp.restControllers;

import com.example.courseapp.dto.CourseRequest;
import com.example.courseapp.models.*;
import com.example.courseapp.repo.UtilisateurRepo;
import com.example.courseapp.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/course")
public class CourseRestController {

    /*** Initialisation des services ***/
    @Autowired
    CourseService courseService;
    @Autowired
    AdresseService adresseService;

    @Autowired
    VilleService villeService;
    @Autowired
    UtilisateurServiceDbImpl utilisateurServiceDb;
    @Autowired
    UtilisateurRepo utilisateurRepo;
    @Autowired
    RoleService roleService;
    @PostMapping
    public Course add(@RequestBody Course newCourse){

        Utilisateur user = roleService.verifRole(Role.GESTIONNAIRE);
        newCourse.setUtilisateur(user);

        newCourse = courseService.verifAdresseVille(newCourse);

        return courseService.add(newCourse);
    }

    /*** Récupération des courses disponibles (à venir) ***/
    @GetMapping("")
    public List<Course> getAvailableCourses() {
        return this.courseService.getAvailableCourses();
    }

    /*** Récupération des courses disponibles (à venir) par user ***/
    @GetMapping("/user/{id}")
    public List<Course> getAvailableCoursesByUser(@PathVariable int id) {
        return this.courseService.getAvailableCoursesByUser(id);
    }

    /*** Récupération des courses payées par utilisateur ***/
    @GetMapping("/user/payed/{id}")
    public List<Course> getPayedCoursesByUser(@PathVariable int id) {
        return this.courseService.getPayedCoursesByUser(id);
    }

    /*** Récupération des courses non supprimées pour un gestionnaire  ***/
    @GetMapping("/admin/{id}")
    public List<Course> getCoursesByGestionnaireAndNotDeleted(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndNotDeleted(id);
    }

    /*** Récupération des courses supprimées pour un gestionnaire  ***/
    @GetMapping("/admin/supprimees/{id}")
    public List<Course> getCoursesByGestionnaireAndDeleted(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndDeleted(id);
    }

    /*** Récupération d'une course non supprimée  ***/
    @GetMapping("/admin/course/{id}")
    public Optional<Course> getCourse(@PathVariable int id) {
        return this.courseService.getCourse(id);
    }

    /*** Suppression logique pour une course ***/
    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable int id){
        courseService.deleteCourse(id);
    }

    /*** Modification d'une course ***/
    @PutMapping("/admin/{id}")
    public void modifCourse(@RequestBody Course course){

        course = courseService.verifAdresseVille(course);
        courseService.updateCourse(course);
    }
}
