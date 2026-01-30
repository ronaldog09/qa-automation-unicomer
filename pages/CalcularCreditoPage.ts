import { Page, Locator, expect } from "@playwright/test";

export type TipoCredito = ' Consumo ' | ' Vivienda ' | ' Vehículo ';

export class CalcularCreditoPage {
    readonly page: Page;

    //Secciones Tipo y Uso Credito
    readonly seccionTipoCredito: Locator;
    readonly seccionUsoCredito: Locator;

    //Textboxes 
    readonly txtIngresoMensual: Locator;
    readonly txtMontoSolicitado: Locator;

    //Selectores
    readonly selectorPlazo: Locator;
    readonly selectorTasa: Locator;

    //Resultados
    readonly montoMaximoFinanciar: Locator;
    readonly cuotaMensual: Locator;
    readonly tasaInteresResultado: Locator;

    constructor(page: Page) {
        this.page = page;

        //Seccion - Tipo de Credito
        this.seccionTipoCredito = page
        .getByText(' ¿Qué tipo de Crédito buscas? ')
        .locator('..');

        //Seccion - Uso de Credito
        this.seccionUsoCredito = page
        .getByText(' ¿Para qué deseas utilizar tu Crédito? ')
        .locator('..');

        //Texboxes - Ingreso Mensual y Monto Solicitado
        this.txtIngresoMensual = page.getByRole('textbox').first();
        this.txtMontoSolicitado = page.getByRole('textbox').nth(1);

        // Selectores - Tipo de Credito
        this.selectorPlazo = page.locator('mat-slider').first();
        this.selectorTasa = page.locator('mat-slider').nth(1);

        //Resultados - Texto mostrado despues de calcular
        this.montoMaximoFinanciar = page
        .getByText('Monto máximo a financiar')
        .locator('..')
        .locator('p')
        .nth(1);

        this.cuotaMensual = page
        .getByText('Cuota mensual')
        .locator('..')
        .locator('p')
        .nth(1);

        this.tasaInteresResultado = page
        .getByText('Tasa de interés')
        .locator('..')
        .locator('p')
        .nth(1);

    }

    // URL de la pagina de Banco Cuscatlan
    async open() {
        await this.page.goto('https://www.bancocuscatlan.com/creditos/calculadora-creditos', 
            { waitUntil: 'domcontentloaded' }
        );
        
        await expect(this.seccionTipoCredito).toBeVisible();
    }

    async seleccionarTipoCredito(tipo: TipoCredito) {
    const boton = this.seccionTipoCredito.getByRole('button', {
      name: tipo,
      exact: true,
    });

        await expect(boton).toBeVisible();
        await boton.click();

        // Esperar a que la sección de uso se muestre
        await expect(this.seccionUsoCredito).toBeVisible();
    }

    async seleccionarUsoCredito(uso: string) {
    const boton = this.seccionUsoCredito.getByRole('button', {
      name: uso,
      exact: true,
    });

    await expect(boton).toBeVisible({ timeout: 10000 });
    await boton.click();
  }

  async ingresarIngresoMensual(monto: number) {
    await this.txtIngresoMensual.fill('');
    await this.txtIngresoMensual.type(monto.toString());
  }

  async ingresarMontoSolicitado(monto: number) {
    await this.txtMontoSolicitado.fill('');
    await this.txtMontoSolicitado.type(monto.toString());
  }

  async seleccionarPlazo(porcentaje: number) {
    const box = await this.selectorPlazo.boundingBox();
    if (!box) return;

    await this.page.mouse.click(
      box.x + box.width * porcentaje,
      box.y + box.height / 2
    );
  }

  async seleccionarTasa(porcentaje: number) {
    const box = await this.selectorTasa.boundingBox();
    if (!box) return;

    await this.page.mouse.click(
      box.x + box.width * porcentaje,
      box.y + box.height / 2
    );
  }



    // Validaciones de los resultados
    async validarResultados() {
        await expect(this.montoMaximoFinanciar).toBeVisible();
        await expect(this.cuotaMensual).toBeVisible();
        await expect(this.tasaInteresResultado).toBeVisible();
    }
}      
        
    
