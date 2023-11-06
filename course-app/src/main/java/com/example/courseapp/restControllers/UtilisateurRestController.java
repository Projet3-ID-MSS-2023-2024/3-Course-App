package com.example.courseapp.restControllers;

import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.IUtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UtilisateurRestController {

    @Autowired
    IUtilisateurService utilisateurService;

    @GetMapping
    public List<Utilisateur> getAll(){
        return utilisateurService.getAllUsers();
    }

    @GetMapping("/admin")
    public List<Utilisateur> getAllAdmins(){
        return utilisateurService.getAllAdmins();
    }

    @GetMapping("/coureur")
    public List<Utilisateur> getAllCoureurs(){
        return utilisateurService.getAllCoureurs();
    }

    @GetMapping("/gestionnaire")
    public List<Utilisateur> getAllGestionnaires(){
        return utilisateurService.getAllGestionnaires();
    }

    @GetMapping("/{id}")
    public Optional<Utilisateur> getByID(@PathVariable int id) throws Exception{
        Optional<Utilisateur> user = utilisateurService.getUserById(id);
        if(user.isEmpty()){
            throw new Exception(); // a modif
        }
        return user;
    }

    @PostMapping
    public Utilisateur add(@RequestBody Utilisateur newUser){
        return utilisateurService.saveUser(newUser);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) throws Exception{
        /*** On vérifie que l'id est present dans la db puis on supprime ***/
        Optional<Utilisateur> testId = utilisateurService.getUserById(id);
        if (testId.isEmpty()){
            throw new Exception(); // a modif
        }
        utilisateurService.deleteById(id);
    }
}
