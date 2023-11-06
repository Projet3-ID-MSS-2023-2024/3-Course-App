package com.example.courseapp.repo;

import com.example.courseapp.models.Ville;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VilleRepo extends JpaRepository<Ville, Long> {
}
