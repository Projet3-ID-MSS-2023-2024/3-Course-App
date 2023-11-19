package com.example.courseapp.services;

import com.example.courseapp.models.Course;
import com.example.courseapp.repo.CourseRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    CourseRepo courseRepo;

    @Override
    public Course add(Course newCourse) {
        return courseRepo.save(newCourse);
    }
}
