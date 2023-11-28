package com.example.courseapp.repo;


import com.example.courseapp.models.Resultat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;



public interface ResultatRepo extends JpaRepository<Resultat, Integer> {
    @Modifying
    @Query("delete from Resultat r where r.course.id = :id ")
    public void deleteResultatsByCourse(int id);
}
