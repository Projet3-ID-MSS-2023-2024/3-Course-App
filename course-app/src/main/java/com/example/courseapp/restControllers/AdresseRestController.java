package com.example.courseapp.restControllers;

import com.example.courseapp.dto.AdresseRequest;
import com.example.courseapp.models.Adresse;
import com.example.courseapp.models.Ville;
import com.example.courseapp.services.AdresseService;
import com.example.courseapp.services.AdresseServiceImpl;
import com.example.courseapp.services.VilleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/adresse")
public class AdresseRestController {

    @Autowired
    AdresseService adresseService;
    @Autowired
    VilleService villeService;

    @PostMapping
    public Adresse add(@RequestBody AdresseRequest newAdresse){
        Ville ville = villeService.getVilleByNom(newAdresse.getVille());

        Adresse adrr = Adresse.builder()
                .rue(newAdresse.getRue())
                .longitude(newAdresse.getLongitude())
                .latitude(newAdresse.getLatitude())
                .ville(ville).build();
        return adresseService.add(adrr);
    }

}
