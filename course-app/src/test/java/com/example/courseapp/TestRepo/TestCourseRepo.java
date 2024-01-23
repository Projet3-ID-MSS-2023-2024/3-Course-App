package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Course;
import com.example.courseapp.repo.CourseRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
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
        assertTrue(!listCourses.isEmpty());
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
    /*** Test pour récupérer toutes les courses cloturées et non supprimées et vérifier si le résultat n'est vide ***/
    @Test
    public void getAllCourseClotureAndNotDeleted(){
        List<Course> listCourses = repoCourse.getCourseForResults();
        assertTrue(!listCourses.isEmpty());
    }

    /*** Test pour récupérer toutes les courses par gestionnaire et supprimées et vérifier si le résultat n'est pas vide ***/
    @Test
    public void getAllCourseByGestionnaireAndDeleted(){
        List<Course> listCourses = repoCourse.getCourseByGestionnaireAndDeleted(1);
        assertTrue(!listCourses.isEmpty());
    }
    /*** Test pour récupérer toutes les courses par gestionnaire et non supprimées et vérifier si le résultat n'est pas vide ***/
    @Test
    public void getAllCourseByGestionnaireAndNotDeleted(){
        List<Course> listCourses = repoCourse.getCourseByGestionnaireAndNotDeleted(1);
        assertTrue(!listCourses.isEmpty());
    }
    /*** Test pour récupérer toutes les courses par gestionnaire et non cloturée et vérifier si le résultat n'est pas vide ***/
    @Test
    public void getAllCourseByGestionnaireAndEnded(){
        List<Course> listCourses = repoCourse.getCourseByGestionnaireAndEnded(1);
        assertTrue(!listCourses.isEmpty());
    }
    /*** Test pour récupérer toutes les courses par gestionnaire et non cloturés et vérifier si le résultat n'est pas vide ***/
    @Test
    public void getAllCourseByGestionnaireAndNotEnded(){
        List<Course> listCourses = repoCourse.getCourseByGestionnaireAndNotEnded(1);
        assertTrue(!listCourses.isEmpty());
    }
    /*** Test pour récupérer toutes les courses cloturées et non supprimées et vérifier si le résultat n'est pas null ***/
    @Test
    public void getAllCourseClotureAndNotDeletedNotNull(){
        List<Course> listCourses = repoCourse.getCourseForResults();
        assertTrue(listCourses!=null);
    }
    /*** Test pour récupérer les courses disponibles et vérifier si le résultat n'est pas vide ***/
    @Test
    public void getAvailableCourses() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<Course> courses = repoCourse.findAvailableCourses(timestamp);
        assertTrue(!courses.isEmpty());
    }

    /*** Test pour récupérer les courses disponibles et vérifier si le résultat n'est pas null ***/
    @Test
    public void getAvailableCoursesNull() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<Course> courses = repoCourse.findAvailableCourses(timestamp);
        assertTrue(courses != null);
    }

    /*** Test pour récupérer les courses disponibles et vérifier qu'aucun résultat n'a été récupéré ***/
    @Test
    public void getAvailableCoursesOutdated() {
        Timestamp timestamp = new Timestamp(4000, 1, 1, 0, 0, 0, 0);
        List<Course> courses = repoCourse.findAvailableCourses(timestamp);
        assertTrue(courses.isEmpty());
    }
}
