package com.example.courseapp.restControllers;

import com.example.courseapp.dto.AuthenticationRequest;
import com.example.courseapp.dto.AuthenticationResponse;
import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.AuthenticationService;
import com.example.courseapp.services.UtilisateurServiceDbImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    AuthenticationService service;
    @Autowired
    UtilisateurServiceDbImpl utilisateurService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody Utilisateur user
    ) throws Exception {
        return ResponseEntity.ok(service.register(user, false));
    }
    @PostMapping("/firstAdmin")
    public ResponseEntity<AuthenticationResponse> registerFirstAdmin(
            @RequestBody Utilisateur user
            ) throws Exception {
        return ResponseEntity.ok(service.register(user, true));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> Authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return service.authenticate(request);
    }
    @PostMapping
    public ResponseEntity<UserResponse> getUserWithToken(@RequestBody String token){
        return ResponseEntity.ok(service.getUserByToken(token));
    }

    @GetMapping
    public boolean confirmRegister(@RequestParam("code") String code) throws Exception {
        var res = service.confirmInscription(code);
        return res;
    }

    @GetMapping("/countUserDb")
    public boolean isEmptyDb(){
        Long test = this.utilisateurService.countUserDb();
        if (test==0){
            return true;
        } else {
            return false;
        }
    }
}
