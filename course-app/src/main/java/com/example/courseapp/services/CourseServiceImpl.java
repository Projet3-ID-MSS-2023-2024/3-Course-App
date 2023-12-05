package com.example.courseapp.services;

import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    CourseRepo courseRepo;

    @Override
    public Course add(Course newCourse) {
        return courseRepo.save(newCourse);
    }

    @Override
    public List<Course> getCourses() {
        return courseRepo.findAll();
    }

    public List<Course> getAvailableCourses() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return courseRepo.findAvailableCourses(timestamp);
    }

    @Override
    public List<Course> getCoursesByGestionnaireAndNotDeleted(int id) {
        return courseRepo.getCourseByGestionnaireAndNotDeleted(id);
    }

    @Override
    public Optional<Course> getCourse(int id) {
        return courseRepo.findById(id);
    }

    @Override
    public void deleteCourse(int id) {
        Optional<Course> courseDel = courseRepo.findById(id);
        Course course = Course.builder()
                .id(courseDel.get().getId())
                .titre(courseDel.get().getTitre())
                .date(courseDel.get().getDate())
                .heure(courseDel.get().getHeure())
                .prix(courseDel.get().getPrix())
                .adresse1(courseDel.get().getAdresse1())
                .adresse(courseDel.get().getAdresse())
                .utilisateur(courseDel.get().getUtilisateur())
                .supprimer(true)
                .build();
        courseRepo.save(course);
    }

    @Override
    public void updateCourse(Course course) {
        Course courseFromDB=courseRepo.getById(course.getId());
        courseFromDB.setAdresse(course.getAdresse());
        courseFromDB.setDate(course.getDate());
        courseFromDB.setHeure(course.getHeure());
        courseFromDB.setPrix(course.getPrix());
        courseFromDB.setAdresse1(course.getAdresse1());
        courseFromDB.setTitre(course.getTitre());
        courseFromDB.setUtilisateur(course.getUtilisateur());
        courseRepo.save(courseFromDB);
    }
}
