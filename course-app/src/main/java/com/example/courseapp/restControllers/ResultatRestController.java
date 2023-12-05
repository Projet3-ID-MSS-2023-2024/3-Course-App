package com.example.courseapp.restControllers;

import com.example.courseapp.models.Course;
import com.example.courseapp.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resultats")
public class ResultatRestController {
    @Autowired
    CourseService courseService;

    @GetMapping("/admin/{id}")
    public List<Course> getCoursesByGestionnaireAndNotEnded(@PathVariable int id) {
        return this.courseService.getCoursesByGestionnaireAndNotEnded(id);
    }
}
