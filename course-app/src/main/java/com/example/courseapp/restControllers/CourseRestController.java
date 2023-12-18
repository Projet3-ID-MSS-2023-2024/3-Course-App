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

    @PostMapping
    public Course add(@RequestBody Course newCourse){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<Utilisateur> author = utilisateurRepo.findByEmail(email);

        if (author.isPresent()){
            Utilisateur user = author.get();
            if (!user.getRole().contains(Role.GESTIONNAIRE)){
                throw new CustomException("Vous n'avez pas les permissions requises.");
            }
            newCourse.setUtilisateur(user);
        } else throw new CustomException("Vous devez vous connecter pour réaliser cette opération.");

        newCourse = courseService.verifAdresseVille(newCourse.getAdresse(), newCourse.getAdresse().getVille(),newCourse);
        newCourse = courseService.verifAdresseVille(newCourse.getAdresse1(), newCourse.getAdresse1().getVille(),newCourse);

        return courseService.add(newCourse);
    }

    @GetMapping("")
    public List<Course> getAvailableCourses() {
        return this.courseService.getAvailableCourses();
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

    /*** Suppression logique pour une course ***/
    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable int id){
        courseService.deleteCourse(id);
    }

    /*** Modification d'une course ***/
    @PutMapping("/admin/{id}")
    public void modifCourse(@RequestBody Course course){
        courseService.updateCourse(course);
    }
}
