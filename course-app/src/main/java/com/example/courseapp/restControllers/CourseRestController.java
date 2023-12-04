package com.example.courseapp.restControllers;

import com.example.courseapp.dto.CourseRequest;
import com.example.courseapp.models.Adresse;
import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.AdresseService;
import com.example.courseapp.services.CourseService;
import com.example.courseapp.services.ResultatService;
import com.example.courseapp.services.UtilisateurServiceDbImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/course")
public class CourseRestController {

    @Autowired
    CourseService courseService;
    @Autowired
    AdresseService adresseService;

    @Autowired
    ResultatService resultatService;
    @Autowired
    UtilisateurServiceDbImpl utilisateurServiceDb;

    @PostMapping
    public Course add(@RequestBody CourseRequest newCourse){
        Adresse adresse = adresseService.getAdresseByRue(newCourse.getAdresse());
        Adresse adresse1 = adresseService.getAdresseByRue(newCourse.getAdresse1());
        Utilisateur utilisateur = utilisateurServiceDb.getByPrenom(newCourse.getUtilisateur());

        Course courseadd = Course.builder()
                .adresse(adresse)
                .adresse1(adresse1)
                .date(newCourse.getDate())
                .heure(newCourse.getHeure())
                .titre(newCourse.getTitre())
                .prix(newCourse.getPrix())
                .utilisateur(utilisateur)
                .build();


        return courseService.add(courseadd);
    }

    @GetMapping("")
    public List<Course> getCourses() {
        return this.courseService.getCourses();
    }

    @GetMapping("/admin/{id}")
    public List<Course> getCoursesByGestionnaireAndNotDeleted(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndNotDeleted(id);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable int id){
        courseService.deleteCourse(id);
    }

    @PutMapping("/admin/{id}")
    public void modifCourse(@RequestBody Course course){
        courseService.updateCourse(course);
    }
}
