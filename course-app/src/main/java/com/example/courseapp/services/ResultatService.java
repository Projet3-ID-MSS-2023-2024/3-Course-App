package com.example.courseapp.services;

import com.example.courseapp.models.Resultat;

import java.util.List;

public interface ResultatService {

    public List<Resultat> getAllResultByCourseId(int id);
}
