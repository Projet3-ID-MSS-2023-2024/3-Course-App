package com.example.courseapp.repo;

import com.example.courseapp.models.Resultat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface ResultatRepo extends JpaRepository<Resultat, Integer> {

    /*** Récup des résultats d'un course non cloturée***/
    @Query("select r from Resultat r where r.course.id =:id")
    public List<Resultat> getAllByIdCourse(int id);
}
