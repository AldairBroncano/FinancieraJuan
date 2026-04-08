package com.example.FinancieraJuan.controller;

import com.example.FinancieraJuan.dto.AnalisisRequest;
import com.example.FinancieraJuan.dto.AnalisisResponse;
import com.example.FinancieraJuan.service.AnalisisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://financierajuan.netlify.app")
public class AnalisisController {

    @Autowired
    private AnalisisService service;

    @PostMapping("/calcular")
    public AnalisisResponse calcular(@RequestBody AnalisisRequest request) {
        return service.analizar(request);
    }
}
