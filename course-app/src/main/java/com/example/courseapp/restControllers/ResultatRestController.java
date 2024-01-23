package com.example.courseapp.restControllers;

import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.Course;
import com.example.courseapp.models.Resultat;
import com.example.courseapp.services.CourseService;
import com.example.courseapp.services.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.IUtilisateurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/resultat")
public class ResultatRestController {

    /*** Initialisation des services ***/
    @Autowired
    CourseService courseService;

    @Autowired
    ResultatService resultatService;

    @Autowired
    IUtilisateurService userService;

    /*** Récupération des courses non supprimées et terminées ainsi que leurs résultats ***/
    @GetMapping("/courses")
    public List<Course> getCoursesEndedAndNotDeleted() {
        return this.courseService.getCourseEndedAndNotDeleted();
    }

    /*** Récupération des résultats de toutes les courses terminées et pas suprimées ***/
    @GetMapping("/courses/{id}")
    public List<Resultat> getAllResultByCourseIdNotAbandon(@PathVariable int id) {
        return this.resultatService.getAllResultByCourseIdNotAbandon(id);
    }

    @GetMapping("/abandon/{id}")
    public List<Resultat> getResultatsByCourseAbandon(@PathVariable int id){
        return this.resultatService.getAllResultByCourseIdAndAbandon(id);
    }

    /*** Récupération des courses non terminées par gestionaire de courses ***/
    @GetMapping("/admin/{id}")
    public List<Course> getCoursesByGestionnaireAndNotEnded(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndNotEnded(id);
    }

    /*** Récupération des courses terminées par gestionaire de courses ***/
    @GetMapping("/admin/terminees/{id}")
    public List<Course> getCoursesByGestionnaireAndEnded(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndEnded(id);
    }

    /*** Récupération des résultats d'une course ***/
    @GetMapping("/admin/resultats/{id}")
    public List<Resultat> getResultatsByCourse(@PathVariable int id) {
        return this.resultatService.getAllResultByCourseId(id);
    }


    /**** Réxupération des résultats pour une personne***/
    @GetMapping("/personnel/{id}")
    public List<Resultat> getResultatsByUser(@PathVariable int id) {
        Optional<Utilisateur> user = userService.getUserById(id);
        return this.resultatService.getAllResultByUser(user);
    }


    /*** Ajout de résultat (après paiement réussi dans le front) ***/

    @PostMapping
    public Resultat add(@RequestBody Resultat newResultat) {
        return resultatService.add(newResultat);
    }

    /*** Récupération des résultats d'un user (pour connaitre ses courses payées) ***/
    @GetMapping("/{id}")
    public List<Resultat> getResultatsByUserId(@PathVariable int id) {
        // Récupération du user complet à partir de son id
        Optional<Utilisateur> user = userService.getUserById(id);

        return this.resultatService.getResultatsByUser(user);
    }

    @PutMapping
    public Resultat update(@RequestBody Resultat newResultat) {
        return resultatService.update(newResultat);
    }

}
