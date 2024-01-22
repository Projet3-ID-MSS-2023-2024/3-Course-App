package com.example.courseapp.TestService;


import com.example.courseapp.models.Course;

import com.example.courseapp.repo.AdresseRepo;
import com.example.courseapp.repo.CourseRepo;
import com.example.courseapp.repo.UtilisateurRepo;

import com.example.courseapp.services.CourseService;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalTime;
import java.util.*;

import static junit.framework.TestCase.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
public class TestCourseService {
    @Autowired
    CourseRepo courseRepo;

    @Autowired
    UtilisateurRepo utilisateurRepo;

    @Autowired
    AdresseRepo adresseRepo;
    @Autowired
    CourseService courseService;

//   @Test
//   @Order(1)
//  public void testAjoutCourse(){
//    Course course = new Course();
//       course.setTitre("Ma Course");
//       course.setDate(new Date());
//       course.setHeure(LocalTime.now());
//       course.setAdresse(adresseRepo.getAdresseById(2));
//       course.setAdresse1(adresseRepo.getAdresseById(1));
//       course.setUtilisateur(utilisateurRepo.findById(1).get());
//       course.isCloturer();
//       course.isSupprimer();

       // Ajoutez la course à pied dans la base de données via le service
 //      Course addedCourse = courseService.add(course);

       // Récupérez la course à pied depuis la base de données
 //      Course courseDb = courseRepo.findById(addedCourse.getId()).orElse(null);

       // Vérifiez que la course à pied ajoutée et celle récupérée sont identiques
 //      assertNotNull(courseDb);
   //    assertEquals("Ma Course", courseDb.getTitre());

 //   }

//        @Test
 //       public void testUpdate() {

   //         Course course= courseRepo.findById(1).get();
     //       course.setTitre("Test Modif");
       //     Course courseMaj=courseService.updateCourse(course);

         //   assertNotNull(courseMaj);
           // Assertions.assertEquals(course, courseMaj);
        //}

//        @Test
  //      public void testSup() {
    //    Course courseDb = courseService.getCourse(2).get();
//
  //      assertTrue(courseDb.isSupprimer() == false);
//
  //      courseService.deleteCourse(2);
//
  //          assertTrue(courseDb.isSupprimer() == true);
    //    }
    }