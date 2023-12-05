package com.example.courseapp.restControllers;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.CourseService;
import com.example.courseapp.services.IUtilisateurService;
import com.example.courseapp.services.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
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
