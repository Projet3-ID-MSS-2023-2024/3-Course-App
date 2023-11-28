package com.example.courseapp.restControllers;

import com.example.courseapp.models.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GestionnaireException {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> gestionMonException(CustomException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
