package com.example.courseapp.restControllers;

import com.example.courseapp.models.Ville;
import com.example.courseapp.repo.VilleRepo;
import com.example.courseapp.services.VilleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/ville")
public class VilleRestController {
    @Autowired
    VilleService villeService;

    @PostMapping
    public Ville add(@RequestBody Ville newVille){
        return villeService.add(newVille);
    }
}
