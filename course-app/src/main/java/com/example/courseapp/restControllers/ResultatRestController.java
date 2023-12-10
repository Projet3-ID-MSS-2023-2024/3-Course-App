package com.example.courseapp.restControllers;

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

    @Autowired
    CourseService courseService;

    @Autowired
    ResultatService resultatService;

    @Autowired
    IUtilisateurService userService;

    @GetMapping("/courses")
    public List<Course> getCoursesEndedAndNotDeleted() {
        return this.courseService.getCourseEndedAndNotDeleted();
    }

    @GetMapping("/admin/{id}")
    public List<Course> getCoursesByGestionnaireAndNotEnded(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndNotEnded(id);
    }

    @GetMapping("/admin/resultats/{id}")
    public List<Resultat> getResultatsByCourse(@PathVariable int id) {
        return this.resultatService.getAllResultByCourseId(id);
    }
    
    @PostMapping
    public Resultat add(@RequestBody Resultat newResultat) {
        return resultatService.add(newResultat);
    }

    @GetMapping("/{id}")
    public List<Resultat> getResultatsByUserId(@PathVariable int id) {
        Optional<Utilisateur> user = userService.getUserById(id);
        return this.resultatService.getResultatsByUser(user);
    }
}
