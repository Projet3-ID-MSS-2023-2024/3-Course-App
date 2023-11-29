package com.example.courseapp.services;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.models.CustomException;
import com.example.courseapp.repo.AdresseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdresseServiceImpl implements AdresseService{
    @Autowired
    AdresseRepo adresseRepo;
    @Override
    public Adresse add(Adresse newAdresse) {
        return adresseRepo.save(newAdresse);
    }

    @Override
    public Adresse GetAdresseByRue(String rue) {
        Optional<Adresse> adresse = adresseRepo.FindByRue(rue);
        if(adresse.isPresent()){
            return Adresse.builder()
                    .rue(adresse.get().getRue())
                    .id(adresse.get().getId())
                    .latitude(adresse.get().getLatitude())
                    .longitude(adresse.get().getLongitude())
                    .ville(adresse.get().getVille())
                    .build();
        } else{
            throw new CustomException("L'adresse n'existe pas");
        }
    }

}
