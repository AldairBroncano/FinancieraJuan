import { Component, ViewEncapsulation } from '@angular/core';
import { AnalisisService } from '../../services/analisisService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './analisis.html',
  styleUrl: './analisis.css',
  encapsulation: ViewEncapsulation.None,
})
export class AnalisisComponent {
  data: any = {
    sueldo: null,
    ingresoExtra: null,
    horasTrabajoDia: null,
    diasTrabajoMes: null,
    tipoPersona: '',

    gastos: {
      vivienda: null,
      comida: null,
      transporte: null,
      ocio: null,
      otros: null,
    },

    deudaTotal: null,
    ahorros: null,
    horasLibresDia: null,
    nivelEstres: null,
    objetivo: null,
    mesesObjetivoDeuda: null,
  };

  resultado = {
    ahorroMensual: 0,
    estadoFinanciero: '-',
    estadoVida: '-',
    gastoTotal: 0,
    mensajePrincipal: 'Completa los datos y presiona calcular',
  };

  intentoEnviar = false;

  constructor(private service: AnalisisService) {}
  calcular() {
    this.intentoEnviar = true;

    if (!this.data.sueldo) return;
    if (!this.data.ingresoExtra) return;
    if (!this.data.horasTrabajoDia) return;
    if (!this.data.diasTrabajoMes) return;
    if (!this.data.tipoPersona) return;

    if (!this.data.gastos.vivienda) return;
    if (!this.data.gastos.comida) return;
    if (!this.data.gastos.transporte) return;
    if (!this.data.gastos.ocio) return;

    const limpiarNumero = (v: any) => (isNaN(v) || v === null ? 0 : v);

    const dataLimpia = {
      ...this.data,
      sueldo: limpiarNumero(this.data.sueldo),
      ingresoExtra: limpiarNumero(this.data.ingresoExtra),
      horasTrabajoDia: limpiarNumero(this.data.horasTrabajoDia),
      diasTrabajoMes: limpiarNumero(this.data.diasTrabajoMes),

      gastos: {
        vivienda: limpiarNumero(this.data.gastos.vivienda),
        comida: limpiarNumero(this.data.gastos.comida),
        transporte: limpiarNumero(this.data.gastos.transporte),
        ocio: limpiarNumero(this.data.gastos.ocio),
        otros: limpiarNumero(this.data.gastos.otros),
      },

      deudaTotal: limpiarNumero(this.data.deudaTotal),
      ahorros: limpiarNumero(this.data.ahorros),
      horasLibresDia: limpiarNumero(this.data.horasLibresDia),
      nivelEstres: limpiarNumero(this.data.nivelEstres),
      mesesObjetivoDeuda: limpiarNumero(this.data.mesesObjetivoDeuda),

      tipoPersona: this.data.tipoPersona || 'DEPENDIENTE',
      objetivo: this.data.objetivo || '',
    };

    console.log('ENVIANDO:', dataLimpia);

    this.service.calcular(dataLimpia).subscribe({
      next: (res) => {
        console.log('RESPUESTA:', res);
        this.resultado = res;
      },
      error: (err) => {
        console.error('ERROR BACKEND:', err);
      },
    });
  }

  irAnalizador() {
    const seccion = document.getElementById('analizador');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }

  descargarPDF() {
    const DATA: any = document.querySelector('.resultado');

    html2canvas(DATA).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contenDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(contenDataURL, 'PNG', 0, 10, imgWidth, imgHeight);
      pdf.save('analisis_financiero.pdf');
    });
  }
}
