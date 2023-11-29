package com.example.courseapp.services;

import com.example.courseapp.models.CustomException;
import com.example.courseapp.models.Ville;
import com.example.courseapp.repo.VilleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VilleServiceImpl implements VilleService{
    @Autowired
    VilleRepo villeRepo;

    @Override
    public Ville add(Ville newVille) {
        return villeRepo.save(newVille);
    }

    @Override
    public List<Ville> getVilles(){return villeRepo.findAll();}

    @Override
    public Ville getVilleByNom(String nom) {
        Optional<Ville> ville = villeRepo.findByNom(nom);
        if (ville.isPresent()){
            return Ville.builder()
                    .ville_id(ville.get().getVille_id())
                    .nom(ville.get().getNom())
                    .code_postale(ville.get().getCode_postale())
                    .build();
        } else {
            throw new CustomException("ville existe pas");
        }
    }
}
