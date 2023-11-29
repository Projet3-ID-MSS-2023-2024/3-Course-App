package com.example.courseapp.restControllers;

import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.AuthenticationServcie;
import com.example.courseapp.services.IUtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UtilisateurRestController {

    @Autowired
    IUtilisateurService utilisateurService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationServcie authenticationServcie;

    @GetMapping
    public List<UserResponse> getAll(){
        return utilisateurService.getAllUsers();
    }

    @GetMapping("/del")
    public List<UserResponse> getAllDel(){
        return utilisateurService.getAllUsersDel();
    }

    @GetMapping("/{id}")
    public Optional<Utilisateur> getByID(@PathVariable int id) throws Exception{
        Optional<Utilisateur> user = utilisateurService.getUserById(id);
        if(user.isEmpty()){
            throw new CustomException("L'utilisateur est introuvable."); // a modif
        }
        return user;
    }

    @PostMapping
    public void add(@RequestBody Utilisateur newUser) throws Exception {
        utilisateurService.addUserbyAdmin(newUser);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) throws Exception{
        utilisateurService.boclkUnclock(id,true);
    }

    @PostMapping("/active")
    public void activeUser(@RequestBody int id) throws Exception{
        utilisateurService.boclkUnclock(id,false);
    }

    /*** Update les données personnel d'utilisateur ***/
    @PutMapping("/{id}")
    public Optional<Utilisateur> putUserById(@RequestBody Utilisateur utilisateur, @PathVariable("id") int id){

        return this.utilisateurService.getUserById(id)
                .map(upUser -> {
                    upUser.setNom(utilisateur.getNom());
                    upUser.setPrenom(utilisateur.getPrenom());
                    upUser.setEmail(utilisateur.getEmail());
                    return utilisateurService.saveUser(upUser);
                });
    }

}
