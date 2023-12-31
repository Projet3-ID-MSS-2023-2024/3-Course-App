package com.example.courseapp.services;

import com.example.courseapp.models.Adresse;

public interface AdresseService {
    public Adresse add(Adresse newAdresse);
    public Adresse getAdresseByRue(String rue);

    public Adresse getAdresseByLatLong(double lat, double lon);
}
