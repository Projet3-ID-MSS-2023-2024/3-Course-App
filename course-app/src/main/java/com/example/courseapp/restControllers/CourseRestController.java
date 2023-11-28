package com.example.courseapp.restControllers;

import com.example.courseapp.models.Course;
import com.example.courseapp.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/course")
public class CourseRestController {

    @Autowired
    CourseService courseService;

    @PostMapping
    public Course add(@RequestBody Course newCourse){
        return courseService.add(newCourse);
    }

    @GetMapping("")
    public List<Course> getCourses() {
        return this.courseService.getCourses();
    }
}
