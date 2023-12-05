package com.example.courseapp.restControllers;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.services.CourseService;
import com.example.courseapp.services.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/course")
public class ResultatRestController {

    @Autowired
    CourseService courseService;

    @Autowired
    ResultatService resultatService;

    @PostMapping
    public Resultat add(@RequestBody Resultat newResultat) {
        return resultatService.add(newResultat);
    }
}
