package com.example.courseapp.restControllers;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.services.AdresseService;
import com.example.courseapp.services.AdresseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/adresse")
public class AdresseRestController {

    @Autowired
    AdresseService adresseService;

    @PostMapping
    public Adresse add(@RequestBody Adresse newAdresse){
        return adresseService.add(newAdresse);
    }

}
