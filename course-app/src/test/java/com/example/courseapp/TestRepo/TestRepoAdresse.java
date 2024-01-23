package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Adresse;
import com.example.courseapp.repo.AdresseRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestRepoAdresse {
    @Autowired
    AdresseRepo adresseRepo;

    /*** Test de recupération de toute les adresses ***/
    @Test
    public void testAdresse(){ // On test si il recupere bien toute les adresse en BD, 3 adresse sont inscrit en BD
        List<Adresse> adresseList = adresseRepo.getAllAdresse();
        assertTrue(!(adresseList.isEmpty()));
        assertTrue(adresseList.size() == 3);
    }

    /*** Test de récuperation d'adresse par id ***/
    @Test
    public void testAdresseById(){ // Test de recuperer les adresse par id, 1 = Clos plein sud, 2 = Rue des gaux, 3 = Rue de la montagne
        Adresse adresse = adresseRepo.getAdresseById(1);
        assertTrue(adresse.getRue().contains("Clos plein sud"));
    }

}
