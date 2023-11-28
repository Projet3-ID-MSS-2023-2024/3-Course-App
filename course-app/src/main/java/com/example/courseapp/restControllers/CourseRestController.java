package com.example.courseapp.restControllers;

import com.example.courseapp.models.Course;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.services.CourseService;
import com.example.courseapp.services.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/course")
public class CourseRestController {

    @Autowired
    CourseService courseService;

    @Autowired
    ResultatService resultatService;

    @PostMapping
    public Course add(@RequestBody Course newCourse){
        return courseService.add(newCourse);
    }

    @GetMapping("")
    public List<Course> getCourses() {
        return this.courseService.getCourses();
    }

    @GetMapping("/admin")
    public List<Course> getCoursesByGestionnaire(int id) {
        return this.courseService.getCoursesByGestionnaire(id);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable int id){
        resultatService.deleteResultats(id);
        courseService.deleteCourse(id);
    }

    @PutMapping("/admin/{id}")
    public void modifCourse(@RequestBody Course course){
        courseService.updateCourse(course);
    }
}
