package com.example.courseapp.services;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.repo.AdresseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdresseServiceImpl implements AdresseService{
    @Autowired
    AdresseRepo adresseRepo;
    @Override
    public Adresse add(Adresse newAdresse) {
        return adresseRepo.save(newAdresse);
    }
}
