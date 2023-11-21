package com.example.courseapp.services;

import com.example.courseapp.config.JwtService;
import com.example.courseapp.dto.AuthenticationRequest;
import com.example.courseapp.dto.AuthenticationResponse;
import com.example.courseapp.dto.LoggedUserResponse;
import com.example.courseapp.dto.RegisterRequest;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServcie {
    private final UtilisateurRepo utilisateurRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final IUtilisateurService utilisateurService;

    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        if (utilisateurService.testEmail(request.getEmail())){}
        if (utilisateurService.testMdp(request.getMdp())){}

        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.COUREUR);

        String code = UUID.randomUUID().toString();
        while (!utilisateurService.testCodeValid(code)){  // pour éviter d'avoir deux fois le meme code dans la bd
            code = null;
            code = UUID.randomUUID().toString();
        }

        var utilisateur = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .mdp(passwordEncoder.encode(request.getMdp()))
                .code(code)
                .isActive(true)     // on active le compte directement pour l'instant
                .role(listRole)
                .build();

        utilisateurRepo.save(utilisateur);
        var jwtToken = jwtService.generateToken(utilisateur);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public ResponseEntity<String> authenticate(AuthenticationRequest request) {  //connexion
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getMdp()
                )
        );
        var user = utilisateurRepo.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(jwtToken);
    }

    public LoggedUserResponse getUserByToken(String token){
        String email = jwtService.extractUsername(token);
        Optional<Utilisateur> user = utilisateurRepo.findByEmail(email);
        return LoggedUserResponse.builder()
                .email(user.get().getEmail())
                .nom(user.get().getNom())
                .prenom(user.get().getPrenom())
                .role(user.get().getRole())
                .build();
    }
}
