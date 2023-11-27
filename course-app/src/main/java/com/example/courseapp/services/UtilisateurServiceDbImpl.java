package com.example.courseapp.services;

import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Override
    public List<UserResponse> getAllUsers() {

        List<Utilisateur> list = utilisateurRepo.findAll();
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
    public List<Utilisateur> getAllAdmins() {
        return utilisateurRepo.getAdmins();
    }

    @Override
    public List<Utilisateur> getAllCoureurs() {
        return utilisateurRepo.getCoureurs();
    }

    @Override
    public List<Utilisateur> getAllGestionnaires() {
        return utilisateurRepo.getGestionnaire();
    }

    @Override
    public void deleteById(int id) {
        utilisateurRepo.deleteById(id);
    }

    @Override
    public boolean testEmail(String email) throws Exception {
        String regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern p = Pattern.compile(regexEmail);
        Matcher m = p.matcher(email);
        if(m.matches()){
            var user = utilisateurRepo.findByEmail(email);
            if (user.isPresent()){
                throw new Exception("email existe déja");
            }
            return true;
        } else {
            throw new Exception("regex email incorrect");
        }
    }
    @Override
    public boolean testMdp(String mdp) throws Exception {
        String regexMdp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";
        Pattern p = Pattern.compile(regexMdp);
        Matcher m = p.matcher(mdp);
        if (m.matches()){
            return true;
        } else {
            throw new Exception("regex mdp incorrect");
        }
    }

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

    @Override
    public void addUserbyAdmin(Utilisateur user) throws Exception {
        this.testEmail(user.getEmail());
        String codeMdp = UUID.randomUUID().toString();
        user.setMdp(passwordEncoder.encode(codeMdp));
        user.setActive(true);
        this.utilisateurRepo.save(user);
    }
}
