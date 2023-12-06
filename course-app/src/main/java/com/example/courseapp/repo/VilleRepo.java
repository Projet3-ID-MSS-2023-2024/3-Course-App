package com.example.courseapp.repo;

import com.example.courseapp.models.Ville;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VilleRepo extends JpaRepository<Ville, Long> {
    public Optional<Ville>findByNom(String nom);
}
