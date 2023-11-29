package com.example.courseapp.services;

import com.example.courseapp.config.JwtService;
import com.example.courseapp.dto.AuthenticationRequest;
import com.example.courseapp.dto.AuthenticationResponse;
import com.example.courseapp.dto.RegisterRequest;
import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.CustomException;
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

    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request, boolean IsAdmin) throws Exception {
        if (utilisateurService.testEmail(request.getEmail().toLowerCase())){}
        if (utilisateurService.testMdp(request.getMdp())){}

        List<Role> listRole = new ArrayList<>();
        if (IsAdmin){ listRole.add(Role.ADMIN); }
        else { listRole.add(Role.COUREUR); }

        String code = UUID.randomUUID().toString();
        while (!utilisateurService.testCodeValid(code)){  // pour éviter d'avoir deux fois le meme code dans la bd
            code = null;
            code = UUID.randomUUID().toString();
        }

        var utilisateur = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail().toLowerCase())
                .mdp(passwordEncoder.encode(request.getMdp()))
                .code(code)
                .isActive(false)
                .role(listRole)
                .build();

        utilisateurRepo.save(utilisateur);

        // pour l'instant on envoi juste un code par mail
        var lien = "http://localhost:4200/confirm/inscription/" + utilisateur.getCode();

        emailService.sendEmail(utilisateur.getEmail(),"Confirmation d'inscription", buildEmail(utilisateur.getPrenom(), lien));

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

    public UserResponse getUserByToken(String token){
        String email = jwtService.extractUsername(token);
        Optional<Utilisateur> user = utilisateurRepo.findByEmail(email);
        return UserResponse.builder()
                .email(user.get().getEmail())
                .nom(user.get().getNom())
                .prenom(user.get().getPrenom())
                .role(user.get().getRole())
                .build();
    }

    public boolean confirmInscription(String code) throws Exception {
        var user = utilisateurService.getUserByCode(code);

        if(user.isPresent()){
            if (user.get().isActive()){
                throw new CustomException("L'email a déja été confirmé");
            }
            var userMod = Utilisateur.builder()
                    .id(user.get().getId())
                    .nom(user.get().getNom())
                    .prenom(user.get().getPrenom())
                    .email(user.get().getEmail())
                    .mdp(user.get().getMdp())
                    .code(user.get().getCode())
                    .role(user.get().getRole())
                    .isActive(true).build();
            utilisateurService.saveUser(userMod);
            return true;
        } else {
            return false;
        }
    }

    /*** Template html qu' on va envoyer par mail ***/
    private String buildEmail(String prenom,String lien){
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title></title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            background-color: #f4f4f4;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            background-color: #fff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 5px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "\n" +
                "        h1 {\n" +
                "            color: #333;\n" +
                "        }\n" +
                "\n" +
                "        p {\n" +
                "            color: #666;\n" +
                "            margin-bottom: 20px;\n" +
                "        }\n" +
                "\n" +
                "        .button {\n" +
                "            display: inline-block;\n" +
                "            padding: 10px 20px;\n" +
                "            font-size: 16px;\n" +
                "            font-weight: bold;\n" +
                "            text-align: center;\n" +
                "            text-decoration: none;\n" +
                "            background-color: #007bff;\n" +
                "            color: #fff;\n" +
                "            border-radius: 5px;\n" +
                "        }\n" +
                "\n" +
                "        .note {\n" +
                "            color: #999;\n" +
                "            font-size: 12px;\n" +
                "            margin-top: 10px;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Confirmation d'Inscription</h1>\n" +
                "        <p>Merci " + prenom + " de vous être inscrit ! Cliquez sur le lien ci-dessous pour confirmer votre inscription :</p>\n" +
                "        <a class=\"button\" href=\""+ lien +"\">Confirmer l'Inscription</a>\n" +
                "        <p class=\"note\">Si le bouton ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur : <br> <a href=\""+ lien +"\">" + lien + "</a></p>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
