package com.example.courseapp.services;

import com.example.courseapp.models.Ville;
import com.example.courseapp.repo.VilleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VilleServiceImpl implements VilleService{
    @Autowired
    VilleRepo villeRepo;

    @Override
    public Ville add(Ville newVille) {
        return villeRepo.save(newVille);
    }
}
