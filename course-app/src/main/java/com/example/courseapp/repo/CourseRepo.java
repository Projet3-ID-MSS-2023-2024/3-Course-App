package com.example.courseapp.repo;

import com.example.courseapp.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CourseRepo extends JpaRepository<Course, Integer> {
}
