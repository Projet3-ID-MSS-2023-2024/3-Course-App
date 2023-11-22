package com.example.courseapp.restControllers;

import com.example.courseapp.dto.AuthenticationRequest;
import com.example.courseapp.dto.AuthenticationResponse;
import com.example.courseapp.dto.LoggedUserResponse;
import com.example.courseapp.dto.RegisterRequest;
import com.example.courseapp.services.AuthenticationServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    AuthenticationServcie service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ) throws Exception {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<String> Authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return service.authenticate(request);
    }
    @PostMapping
    public ResponseEntity<LoggedUserResponse> getUserWithToken(@RequestBody String token){
        return ResponseEntity.ok(service.getUserByToken(token));
    }

    @GetMapping
    public String confirmRegister(@RequestParam("code") String code) throws Exception {
        var res = service.confirmInscription(code);
        return "" + res;
    }
}
