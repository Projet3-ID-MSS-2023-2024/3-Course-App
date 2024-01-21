package com.example.courseapp.restControllers;

import com.example.courseapp.dto.ChangePasswordRequest;
import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.AuthenticationService;
import com.example.courseapp.services.IUtilisateurService;
import com.example.courseapp.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    AuthenticationService authenticationService;
    @Autowired
    RoleService roleService;

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
    @PutMapping("/role/{id}")
    public Optional<Utilisateur> changeRole(@RequestBody Utilisateur utilisateur, @PathVariable("id") int id) throws Exception {
        return this.utilisateurService.getUserById(id)
                .map(upUser -> utilisateurService.saveUser(upUser));
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) throws Exception{
        roleService.verifRole(Role.ADMIN);
        utilisateurService.boclkUnclock(id,true);
    }

    @PostMapping("/active")
    public void activeUser(@RequestBody int id) throws Exception{
        roleService.verifRole(Role.ADMIN);
        utilisateurService.boclkUnclock(id,false);
    }
    @PostMapping("/generate/mdpTemp")
    public void generateNewMdpTemp(@RequestBody int id) throws Exception {
        utilisateurService.newMdpTemp(id);
    }

    /*** Update les données personnel d'utilisateur ***/
    @PutMapping("/name/{id}")
    public Optional<Utilisateur> putUserNameById(@RequestBody Utilisateur utilisateur, @PathVariable("id") int id){

        return this.utilisateurService.getUserById(id)
                .map(upUser -> {
                    upUser.setNom(utilisateur.getNom());
                    return utilisateurService.saveUser(upUser);
                });
    }

    @PutMapping("/mail/{id}")
    public Optional<Utilisateur> putUserMailById(@RequestBody Utilisateur utilisateur, @PathVariable("id") int id){

        return this.utilisateurService.getUserById(id)
                .map(upUser -> {
                    upUser.setEmail((utilisateur.getEmail()));
                    return utilisateurService.saveUser(upUser);
                });
    }

    @PutMapping("/prenom/{id}")
    public Optional<Utilisateur> putUserPrenomById(@RequestBody Utilisateur utilisateur, @PathVariable("id") int id){

        return this.utilisateurService.getUserById(id)
                .map(upUser -> {
                    upUser.setPrenom(utilisateur.getPrenom());
                    return utilisateurService.saveUser(upUser);
                });
    }

    @PutMapping("/changePassword/{id}")
    public Optional<Utilisateur> changePassword(@RequestBody ChangePasswordRequest request, @PathVariable("id") int id){

        return this.utilisateurService.getUserById(id)
                .map(chgUser -> {
                    chgUser.setMdp((request.getNewPassword()));
                    return utilisateurService.saveUser(chgUser);
                });


    }
    @PostMapping("/addMdp")
    public boolean addMdp(@RequestBody String mdp) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return utilisateurService.addMdp(mdp,email);
    }

}
