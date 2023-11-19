package com.example.courseapp.restControllers;

import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.IUtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/users")
public class UtilisateurRestController {

    @Autowired
    IUtilisateurService utilisateurService;
    @Autowired
    PasswordEncoder passwordEncoder;

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
        newUser.setMdp(passwordEncoder.encode(newUser.getPassword()));
        return utilisateurService.saveUser(newUser);
    }

    @PostMapping("/firstAdmin")
    public Utilisateur addFirstAdmin(@RequestBody Utilisateur newAdmin) throws Exception {

        String regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern p = Pattern.compile(regexEmail);
        Matcher m = p.matcher(newAdmin.getEmail());

        if (m.matches()){

            String regexMdp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";
            p = Pattern.compile(regexMdp);
            m = p.matcher(newAdmin.getMdp());

            if (m.matches()){

                List<Role> roles = new ArrayList<>();
                roles.add(Role.ADMIN);

                newAdmin.setRole(roles);
                newAdmin.setMdp(passwordEncoder.encode(newAdmin.getMdp()));
                newAdmin.setActive(true);
                return utilisateurService.saveUser(newAdmin);

            } else {
                throw new Exception();
            }
        } else {
            throw new Exception();
        }
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
