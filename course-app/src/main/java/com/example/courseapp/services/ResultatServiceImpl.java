package com.example.courseapp.services;

import com.example.courseapp.repo.ResultatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultatServiceImpl implements ResultatService {

    @Autowired
    ResultatRepo resultatRepo;
    @Override
    public void deleteResultats(int id) {
        resultatRepo.deleteResultatsByCourse(id);
    }
}