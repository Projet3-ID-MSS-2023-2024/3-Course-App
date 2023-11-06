package com.example.courseapp;

import com.example.courseapp.models.Course;
import com.example.courseapp.repo.CourseRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestCourseRepo {
    @Autowired
    CourseRepo repoCourse;

    /*** Test pour récupérer toutes les courses et voir si la liste n'est pas vide ***/
    @Test
    public void getAllCourse(){
        List<Course> listCourses = repoCourse.findAll();
        assertTrue(listCourses.size()!=0);
    }

    /*** Test pour récupérer toutes les courses et voir si la liste n'est pas null ***/
    @Test
    public void getAllCourseNotNull(){
        List<Course> listCourses = repoCourse.findAll();
        assertTrue(listCourses != null);
    }

    /*** Test pour récupérer une course par l'id et voir si le résultat n'est pas vide ***/
    @Test
    public void getCourse(){
        Optional<Course> course = repoCourse.findById(1);
        assertTrue(!course.isEmpty());
    }
    /*** Test pour récupérer une course par l'id et voir si le résultat n'est pas null ***/
    @Test
    public void getCourseNotNull(){
        Optional<Course> course = repoCourse.findById(1);
        assertTrue(course != null);
    }
}
