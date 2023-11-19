package com.example.courseapp.services;

import com.example.courseapp.models.Course;
import jakarta.servlet.http.HttpServletRequest;

/*** Mise en place de l'interface de course afin de visualiser les methodes***/
public interface CourseService {
    /*** Methode qui ajoute une course ***/
    public Course add(Course newCourse);
}
