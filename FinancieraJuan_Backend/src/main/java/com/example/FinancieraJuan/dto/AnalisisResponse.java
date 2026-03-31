package com.example.FinancieraJuan.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnalisisResponse {


    private double salarioHora;
    private double gastoTotal;
    private double ahorroMensual;
    private double porcentajeGasto;

    private String estadoFinanciero;
    private String estadoVida;

    private double cuotaDeudaRecomendada;
    private int mesesParaSalirDeuda;

    private String indiceVida;

    private String mensajePrincipal;
    private List<String> recomendaciones;
}
