package com.example.courseapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdresseRequest {
    private int latitude;
    private int longitude;
    private String rue;
    private String ville;
}
