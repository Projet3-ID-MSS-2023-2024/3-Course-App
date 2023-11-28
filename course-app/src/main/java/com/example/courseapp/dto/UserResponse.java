package com.example.courseapp.dto;

import com.example.courseapp.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private int id;
    private String nom;
    private String prenom;
    private String email;
    private List<Role> role;
    private boolean isActive;
}
