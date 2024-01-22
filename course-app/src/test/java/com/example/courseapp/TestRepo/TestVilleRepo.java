package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Ville;
import com.example.courseapp.repo.VilleRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class TestVilleRepo {

    @Autowired
    VilleRepo villeRepo;

    @Test
    public void findByNom(){
        Optional<Ville> ville = villeRepo.findByNom("Chatelet");
                assertTrue(!ville.isEmpty());
    }

    @Test
    public void findByNomNull(){
        Optional<Ville> ville = villeRepo.findByNom("");
        assertTrue(ville.isEmpty());
    }

    @Test
    public void findByNomEqual(){
        Optional<Ville> ville = villeRepo.findByNom("Chatelet");
        assertEquals(true,ville.isPresent());
    }

}
