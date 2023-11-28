package com.example.courseapp.services;

import com.example.courseapp.models.Course;
import com.example.courseapp.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public List<Course> getCoursesByGestionnaire(int id) {
        return courseRepo.getCourseByGestionnaire(id);
    }

    @Override
    public Optional<Course> getCourse(int id) {
        return courseRepo.findById(id);
    }

    @Override
    public void deleteCourse(int id) {
        courseRepo.deleteById(id);
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
        courseRepo.save(courseFromDB);
    }
}
