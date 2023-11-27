package com.example.courseapp.services;

import com.example.courseapp.models.Ville;

import java.util.List;

public interface VilleService {
    public Ville add(Ville newVille);

    public List<Ville> getVilles();
}
