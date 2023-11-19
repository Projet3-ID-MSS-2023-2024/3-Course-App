package com.example.courseapp.restControllers;

import com.example.courseapp.models.Course;
import com.example.courseapp.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/course")
public class CourseRestController {

    @Autowired
    CourseService courseService;

    @PostMapping
    public Course add(@RequestBody Course newCourse){
        return courseService.add(newCourse);
    }


}
