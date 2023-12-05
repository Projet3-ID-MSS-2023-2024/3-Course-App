package com.example.courseapp.services;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.repo.ResultatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultatServiceImpl implements ResultatService {

    @Autowired
    ResultatRepo resultatRepo;

    @Override
    public List<Resultat> getAllResultByCourseId(int id) {
        return resultatRepo.getAllByIdCourse(id);
    }
}