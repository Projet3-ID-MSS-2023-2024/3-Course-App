package com.example.courseapp.services;

import com.example.courseapp.models.Course;

import java.util.List;
import java.util.Optional;

/*** Mise en place de l'interface de course afin de visualiser les methodes***/
public interface CourseService {
    /*** Methode qui ajoute une course ***/
    public Course add(Course newCourse);

    public List<Course> getCourses();

    public List<Course> getCoursesByGestionnaire(int id);

    public Optional<Course> getCourse(int id);

    public void deleteCourse(int id);

    public void updateCourse(Course course);
}
