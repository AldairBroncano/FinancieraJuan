package com.example.FinancieraJuan.service;

import com.example.FinancieraJuan.dto.AnalisisRequest;
import com.example.FinancieraJuan.dto.AnalisisResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalisisService {

    public AnalisisResponse analizar(AnalisisRequest request){

        AnalisisResponse response = new AnalisisResponse();

        //Calcular gasto total
        double gastoTotal = request.getGastos().getVivienda()
        + request.getGastos().getComida()
        + request.getGastos().getTransporte()
        + request.getGastos().getOcio()
        + request.getGastos().getOtros();

        //salario por hora
        double horaMes = request.getHorasLibresDia() * request.getDiasTrabajoMes();
        double salarioHora = request.getSueldo() / horaMes;

        //ahorro
        double ahorro =  request.getSueldo() - gastoTotal;

        //porcentaje de gastos
        double porcentaje =(gastoTotal/request.getSueldo())*100;

        //Estado financiero
        String estadoFinanciero;
        if(porcentaje > 70) estadoFinanciero="CRITICO";
        else if (porcentaje > 50) estadoFinanciero="INESTABLE";
        else if (porcentaje > 30) estadoFinanciero="ESTABLE";
        else estadoFinanciero ="OPTIMO";

        //Estado financiero
        String estadoVida;
        if(request.getNivelEstres()>=8) estadoVida="ALTO RIESGO";
        else if (request.getNivelEstres()>=6) estadoVida="TENSION";
        else if (request.getNivelEstres()>=4) estadoVida="EQUILIBRADO";
        else estadoVida = "SALUDABLE";

        //Deuda
        int meses = request.getMesesObjetivoDeuda();
        double cuota = request.getDeudaTotal() / meses;

        //Indice de vida
        String indiceVida = (estadoFinanciero.equals("CRITICO") || estadoVida.equals("ALTO RIESGO"))
                ? "RIESGO ALTO"
                : "RIESGO MODERADO";

        //Mensaje principal
        String mensaje = "Tu situacion es " + estadoFinanciero.toLowerCase() +
                "; pero tu estado de vida es " + estadoVida.toLowerCase();

        //Recomensaciones
        List<String> recomendaciones = new ArrayList<>();
        if(porcentaje >60)
            recomendaciones.add("Reduce tus gastos mensuales");
        if(request.getNivelEstres()>6)
            recomendaciones.add("Tu nivel de estrés es alto, considera descansar más");
        if(request.getDeudaTotal()>0)
            recomendaciones.add("Prioriza el pago de tu deuda");

        //setear response

        response.setSalarioHora(salarioHora);
        response.setGastoTotal(gastoTotal);
        response.setAhorroMensual(ahorro);
        response.setPorcentajeGasto(porcentaje);
        response.setEstadoFinanciero(estadoFinanciero);
        response.setEstadoVida(estadoVida);
        response.setCuotaDeudaRecomendada(cuota);
        response.setMesesParaSalirDeuda(meses);
        response.setIndiceVida(indiceVida);
        response.setMensajePrincipal(mensaje);
        response.setRecomendaciones(recomendaciones);

        return response;


    }





}
