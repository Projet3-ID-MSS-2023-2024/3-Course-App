package com.example.courseapp.services;

import com.example.courseapp.dto.ChangePasswordRequest;
import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Role;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UtilisateurServiceDbImpl implements IUtilisateurService{

    @Autowired
    UtilisateurRepo utilisateurRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    EmailService emailService;
    @Autowired
    RoleService roleService;

    /*** Cette fonction permet de renvoyer une liste des utilisateurs non supprimés
        avec seulement les informations nécessaires, on évite de renvoyer des infos secretes ou inutiles. ***/
    @Override
    public List<UserResponse> getAllUsers() {

        List<Utilisateur> list = utilisateurRepo.getUser();
        List<UserResponse> newList = new ArrayList<>();

        for (int i =0; i<list.size(); i++){

            Utilisateur user = list.get(i);
            newList.add(
                    UserResponse.builder()
                            .id(user.getId())
                            .nom(user.getNom())
                            .prenom(user.getPrenom())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .isActive(user.isActive())
                            .del(user.isDel())
                            .build()
            );
        };
        return newList;
    }

    /*** Cette fonction permet de renvoyer une liste des utilisateurs supprimés
     avec seulement les informations nécessaires, on évite de renvoyer des infos secretes ou inutiles. ***/
    @Override
    public List<UserResponse> getAllUsersDel() {
        List<Utilisateur> list = utilisateurRepo.getUserDel();
        List<UserResponse> newList = new ArrayList<>();

        for (int i =0; i<list.size(); i++){

            Utilisateur user = list.get(i);
            newList.add(
                    UserResponse.builder()
                            .id(user.getId())
                            .nom(user.getNom())
                            .prenom(user.getPrenom())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .isActive(user.isActive())
                            .del(user.isDel())
                            .build()
            );
        };
        return newList;
    }

    @Override
    public Utilisateur saveUser(Utilisateur newUser) {
        return utilisateurRepo.save(newUser);
    }

    @Override
    public Optional<Utilisateur> getUserById(int id) {
        return utilisateurRepo.findById(id);
    }

    @Override
    public void deleteById(int id) {
        utilisateurRepo.deleteById(id);
    }

    /*** Cette fonction permet de vérifier le format de l'adresse mail grace a une regex ***/
    @Override
    public boolean testEmail(String email) throws Exception {
        String regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern p = Pattern.compile(regexEmail);
        Matcher m = p.matcher(email);
        if(m.matches()){
            var user = utilisateurRepo.findByEmail(email);
            if (user.isPresent()){
                throw new CustomException("L'email existe déja.");
            }
            return true;
        } else {
            throw new CustomException("L'adresse email est incorrecte.");
        }
    }

    /*** Cette fonction permet de vérifier le format de d'un mot de passe grace a une regex ***/
    @Override
    public boolean testMdp(String mdp) throws Exception {
        String regexMdp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";
        Pattern p = Pattern.compile(regexMdp);
        Matcher m = p.matcher(mdp);
        if (m.matches()){
            return true;
        } else {
            throw new CustomException("Le mot de passe doit contenir au moins 8 caractères avec au moins" +
                    "un chiffre, une minuscule et une majuscule.");
        }
    }

    /*** Cette fonction permet de vérifier si le code est déja utilisé pour un utilisateur ***/
    @Override
    public boolean testCodeValid(String code) {
        var user = utilisateurRepo.findByCode(code);
        if (user.isEmpty()){return true;}
        else {return false;}
    }

    @Override
    public Optional<Utilisateur> getUserByCode(String code) {
        return utilisateurRepo.findByCode(code);
    }

    /*** Cette fonction permet a un admin d'ajouter un utilisateur ***/
    @Override
    public void addUserbyAdmin(Utilisateur user) throws Exception {

        //On s'assure que l auteur possede bien le role d'admin
        Utilisateur author = roleService.verifRole(Role.ADMIN);

        this.testEmail(user.getEmail().toLowerCase());
        String codeMdp = UUID.randomUUID().toString();
        user.setEmail(user.getEmail().toLowerCase());
        user.setMdp(passwordEncoder.encode(codeMdp));
        user.setTempMdp(true);
        user.setActive(true);
        user.setDel(false);
        this.utilisateurRepo.save(user);
        emailService.sendEmail(user.getEmail(), "Code de connexion", buildEmailCodeConnexion(user.getPrenom(), codeMdp,author.getPrenom(), false));
    }

    @Override
    public Utilisateur getByPrenom(String prenom) {
        Optional<Utilisateur> utilisateur = utilisateurRepo.findByPrenom(prenom);
        if(utilisateur.isPresent()){
            return Utilisateur.builder()
                    .prenom(utilisateur.get().getPrenom())
                    .nom(utilisateur.get().getNom())
                    .email(utilisateur.get().getEmail())
                    .id(utilisateur.get().getId())
                    .role(utilisateur.get().getRole())
                    .isActive(utilisateur.get().isActive())
                    .mdp(utilisateur.get().getMdp())
                    .del(utilisateur.get().isDel())
                    .build();
        }
        else {
            throw new CustomException("L'utilisateur n'existe pas");
        }
    }

    /*** Fonction pour ajouter un mot de passe qui va remplacer le mot de passe temporaire ***/
    @Override
    public boolean addMdp(String mdp, String email) throws Exception {
        Optional<Utilisateur> user = utilisateurRepo.findByEmail(email);
        if (user.isEmpty()){
            throw new CustomException("L'utilisateur n'existe pas."); // a modif
        }
        this.testMdp(mdp);
        Utilisateur userMod = user.get();
        userMod.setMdp(passwordEncoder.encode(mdp));
        userMod.setTempMdp(false);
        utilisateurRepo.save(userMod);
        return true;
    }

    /*** Génération d'un nouveau mot de passe ***/
    @Override
    public void changePassword(ChangePasswordRequest request, int id){
        Optional<Utilisateur> user = utilisateurRepo.findById(id);
        Utilisateur userPwd = user.get();

        if(!passwordEncoder.matches(request.getCurrentPassword(),userPwd.getMdp() )){
            throw new IllegalStateException("Mauvais mot de passe");
        }

        if(!request.getNewPassword().equals(request.getConfirmationPassword())){
            throw new IllegalStateException("Les mot de passes ne sont pas identiques");
        }
         userPwd.setMdp(passwordEncoder.encode(request.getNewPassword()));
        utilisateurRepo.save(userPwd);
    }

    /*** Génération d'un nouveau mot de passe qui va permettre une seule connexion a l'utilisateur ***/
    @Override
    public void newMdpTemp(int id) throws Exception {
        Utilisateur author = roleService.verifRole(Role.ADMIN);

        Optional<Utilisateur> user = utilisateurRepo.findById(id);
        if (user.isEmpty()){
            throw new CustomException("L'utilisateur n'existe pas.");
        }
        Utilisateur userMod = user.get();
        String codeMdp = UUID.randomUUID().toString();
        userMod.setMdp(passwordEncoder.encode(codeMdp));
        userMod.setTempMdp(true);
        utilisateurRepo.save(userMod);
        emailService.sendEmail(userMod.getEmail(), "Mot de passe temporaire", buildEmailCodeConnexion(userMod.getPrenom(), codeMdp,author.getPrenom(), true));
    }


    /*** Suppression logique ou réactivation d'un compte ***/
    @Override
    public void boclkUnclock(int id, boolean block) throws Exception{
        // Si block est a true, on suprrime l'utilisateur
        // Si block est a false, on réactive l'utilisateur

        Optional<Utilisateur> testId = utilisateurRepo.findById(id);
        if (testId.isEmpty()){
            throw new CustomException("L'utilisateur n'existe pas."); // a modif
        }
        Utilisateur user = testId.get();
        user.setDel(block);
        user.setActive(!block);
        utilisateurRepo.save(user);
        if (!block){
            emailService.sendEmail(user.getEmail(),"Votre compte a été réactivé.",emailReactivationCompte(user.getPrenom()));
        }
    }

    public Long countUserDb(){
        return this.utilisateurRepo.count();
    }

    /*** fonction pour créer le template html apres avoir ajouter un admin si le boolean mdp est a false
     ou apres avoir generer un nouveau mot de passse temporaire si le boolean newMdp est a true ***/

    private String buildEmailCodeConnexion(String prenom,String codeMdp, String admin,boolean newMdp){
        String template = "<!DOCTYPE html>\n" +
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
                "            display: flex;\n" +
                "            align-items: center;\n" +
                "            justify-content: center;\n" +
                "            height: 100vh;\n" +
                "        }\n" +
                "\n" +
                "        .box {\n" +
                "            max-width: 600px;\n" +
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
                "        .code {\n" +
                "            font-size: 20px;\n" +
                "            font-weight: bold;\n" +
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
                "    <div class=\"box\">\n" +
                "        <h2>Code de Connexion</h2>\n" +
                "        <p>Bonjour "+ prenom +",</p>\n";
        if (newMdp){
            template = template + "<p>L'administrateur "+ admin +
                    " a créé un nouveau mot de passe temporaire pour ton compte sur l'application Course App.</p>\n";
        } else {
            template = template + "<p>Tu as été inscrit sur l'application Course App par l'administrateur "+ admin +".</p>\n";
        }
        template = template +
                "        <p>Utilise ton adresse mail ainsi que le mot de passe temporaire ci-dessous pour te connecter.</p>\n" +
                "        <p class=\"code\">"+ codeMdp +"</p>\n" +
                "        <p class=\"note\">Attention, ce mot de passe n'est valide qu'une seule fois, il t'es donc fortement recommandé de te créer un mot de passe une fois connecté.</p>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";

        return template;
    }

    /*** fonction pour créer le template html pour prévenir un utilisateur que son compte a été réactivé ***/

    private String emailReactivationCompte(String prenom){
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
                "            display: flex;\n" +
                "            align-items: center;\n" +
                "            justify-content: center;\n" +
                "            height: 100vh;\n" +
                "        }\n" +
                "\n" +
                "        .box {\n" +
                "            max-width: 600px;\n" +
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
                "    <div class=\"box\">\n" +
                "        <h1>Réactivation de Compte</h1>\n" +
                "        <p>Bonjour "+ prenom +",</p>\n" +
                "        <p>Votre compte a été réactivé avec succès. Vous pouvez maintenant vous reconnecter en utilisant le bouton ci-dessous :</p>\n" +
                "        <a class=\"button\" href=\"http://localhost:4200/\">Se Connecter</a>\n" +
                "        <p class=\"note\">Si vous n'avez pas demandé la réactivation de votre compte, veuillez nous contacter.</p>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
