package com.example.FinancieraJuan.dto;

import lombok.Data;

@Data
public class AnalisisRequest {

    private double sueldo;
    private int horasTrabadoDia;
    private int diasTrabajoMes;
    private TipoPersona tipoPersona;
    private Gastos gastos;

    private double deudaTotal;
    private double ahorros;

    private int horasLibresDia;
    private int nivelEstres;

    private String objetivo;
    private int mesesObjetivoDeuda;

}
