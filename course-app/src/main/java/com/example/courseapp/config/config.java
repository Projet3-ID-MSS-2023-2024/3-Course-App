package com.example.courseapp.config;

import com.example.courseapp.models.*;
import com.example.courseapp.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*** Fichier de configuration de la DB, necessaire pour la mise en place de la DB***/
@Configuration
public class config {
    @Autowired
    PasswordEncoder passwordEncoder;
    /*** Configuration de la table Ville, doit être rempli
     * en premier afin de remplir la table adresse
     */
    @Bean
    public List<Ville> VilleRepository(VilleRepo villeRepo){
        /*** Initialisation d'une liste de ville a ajouter en DB***/
        List<Ville> villeList = new ArrayList<>(3);

        /*** Mise en place de la ville 1 = Chatelet ***/
        Ville ville1 = new Ville(1,"Chatelet",6200);
        villeList.add(ville1); //Ajoute dans la liste villeLIst
        villeRepo.save(ville1); // Sauvegarde dans le repository

        /*** Mise en place de la ville 2 = Aiseau ***/
        Ville ville2 = new Ville(2,"Aiseau",6250);
        villeList.add(ville2); //Ajoute dans la liste villeLIst
        villeRepo.save(ville2); // Sauvegarde dans le repository

        /*** Mise en place de la ville 3 = Charleroi ***/
        Ville ville3 = new Ville(3,"Charleroi",6000);
        villeList.add(ville3); //Ajoute dans la liste villeLIst
        villeRepo.save(ville3); // Sauvegarde dans le repository

        return villeList;
    }
    /*** Configuration de la table Adresse ***/
    @Bean
    public List<Adresse> AdresseRepository(AdresseRepo adresseRepo, List<Ville> villeList){
        /*** Initialisation d'une liste d'adresse a ajouter en DB***/
        List<Adresse> adresseList = new ArrayList<>(3);

        /*** Mise en place de l'adresse 1 ***/
        Adresse adresse1 = new Adresse(1,"Clos plein sud",-2122324325,214325324,villeList.get(1));
        adresseList.add(adresse1); //Ajoute dans la liste adresseList
        adresseRepo.save(adresse1); // Sauvegarde dans le repository

        /*** Mise en place de l'adresse 2 ***/
        Adresse adresse2 = new Adresse(2,"Rue des gaux",-228938943,58734837,villeList.get(0));
        adresseList.add(adresse2); //Ajoute dans la liste adresseList
        adresseRepo.save(adresse2); // Sauvegarde dans le repository

        /*** Mise en place de l'adresse 3 ***/
        Adresse adresse3 = new Adresse(3,"Rue de la montagne",-2122324325,214325324,villeList.get(2));
        adresseList.add(adresse3); //Ajoute dans la liste adresseList
        adresseRepo.save(adresse3); // Sauvegarde dans le repository

        return adresseList;
    }

    @Bean
    public Utilisateur UserRepository(UtilisateurRepo userRepo){
        List<Role> listRole = new ArrayList<>();
        listRole.add(Role.ADMIN);
        listRole.add(Role.COUREUR);
        listRole.add(Role.GESTIONNAIRE);
        Utilisateur user = new Utilisateur(1, "Bernard","Amaury","admin0@gmail.com", passwordEncoder.encode("mdp"), "fdsjhgdshg",false, false,true, listRole);
        userRepo.save(user);
        return user;
    }

    /*** Configuration de la table Course ***/
    @Bean
    public List<Course> CourseRepository(CourseRepo repoCourse, List<Adresse> adresseList, Utilisateur user)
    {
        /*** Initialisation d'une liste de course a ajouter en DB***/
        List<Course> listCourse = new ArrayList<>();

        /*** Mise en place de la course 1 ***/
        Course course1 = new Course(1,"Course d'Halloween",5.50,new Date(2022,05,30),LocalTime.of(10,35,00) ,adresseList.get(1),adresseList.get(0),user);
        listCourse.add(course1); //Ajout dans la liste listCourse
        repoCourse.save(course1); // Sauvegarde dans le repository

        /*** Mise en place de la course 2 ***/
        Course course2 = new Course(2,"Course de Noel",10,new Date(2023,10,30),LocalTime.of(10,35,00),adresseList.get(2),adresseList.get(2),user);
        listCourse.add(course2); //Ajout dans la liste listCourse
        repoCourse.save(course2); // Sauvegarde dans le repository

        /*** Mise en place de la course 3 ***/
        Course course3 = new Course(3,"Charleroi-Chatelet",20.5,new Date(2023,12,30),LocalTime.of(10,35,00),adresseList.get(2),adresseList.get(1),user);
        listCourse.add(course3); //Ajout dans la liste listCourse
        repoCourse.save(course3); // Sauvegarde dans le repository

        return listCourse;
    }
    /*** Configuration de la table Résultat ***/
    @Bean
    public List<Resultat> ResultatRepository(ResultatRepo repoResultat, List<Course> listCourse, Utilisateur user)
    {
        /*** Initialisation d'une liste de course a ajouter en DB***/
        List<Resultat> listResultat = new ArrayList<>();

        /*** Mise en place du resultat 1 ***/
        Resultat resultat1 = new Resultat(1,null,"Blessure",listCourse.get(1),user);
        listResultat.add(resultat1); //Ajout dans la liste listResultat
        repoResultat.save(resultat1); // Sauvegarde dans le repository

        /*** Mise en place du resultat 2 ***/
        Resultat resultat2 = new Resultat(2,null,"Pas Présenté",listCourse.get(0),user);
        listResultat.add(resultat2); //Ajout dans la liste listResultat
        repoResultat.save(resultat2); // Sauvegarde dans le repository

        /*** Mise en place du resultat 3 ***/
        Resultat resultat3 = new Resultat(3,new Time(3,30,22),null,listCourse.get(2),user);//déprécié pour le time mais ok
        listResultat.add(resultat3); //Ajout dans la liste listResultat
        repoResultat.save(resultat3); // Sauvegarde dans le repository

        return listResultat;
    }
}
