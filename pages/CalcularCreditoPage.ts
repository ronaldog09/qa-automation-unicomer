import { Page, Locator, expect } from "@playwright/test";
import * as allure from "allure-js-commons"; // Importamos para los steps
import allureHelper from "../lib/allure-helper"; // Importamos tu helper

export type TipoCredito = 'Consumo' | 'Vivienda' | 'Vehículo';

export class CalcularCreditoPage {
    readonly page: Page;
    readonly txtIngresoMensual: Locator;
    readonly txtMontoSolicitado: Locator;
    readonly selectorPlazo: Locator;
    readonly selectorTasa: Locator;

    constructor(page: Page) {
        this.page = page;
        // Inicializamos los selectores
        this.txtIngresoMensual = page.locator('input').first();
        this.txtMontoSolicitado = page.locator('input').nth(1);
        this.selectorPlazo = page.locator('mat-slider').first();
        this.selectorTasa = page.locator('mat-slider').nth(1);
    }

    async open() {
        await allure.step("Abrir calculadora de créditos", async () => {
            await this.page.goto('https://www.bancocuscatlan.com/creditos/calculadora-creditos', { 
                waitUntil: 'domcontentloaded', 
                timeout: 60000 
            });
            const tituloCalculadora = this.page.getByText(/¿Qué tipo de Crédito buscas?/i);
            await tituloCalculadora.waitFor({ state: 'visible', timeout: 30000 });
        });
    }

    async seleccionarTipoCredito(tipo: TipoCredito) {
        await allure.step(`Seleccionar tipo de crédito: ${tipo}`, async () => {
        // Buscamos el botón que contenga el texto del tipo de crédito
        const boton = this.page.locator('button').filter({ hasText: tipo }).first();
        await boton.waitFor({ state: 'visible' });
        await boton.click();
        });
    }

    async seleccionarUsoCredito(uso: string) {
        await allure.step(`Seleccionar Uso de crédito: ${uso}`, async () => {
        // exact: false para evitar errores por espacios invisibles en el HTML
        const boton = this.page.getByRole('button', { name: uso, exact: false });
        await boton.click();
        // Esperamos a que la calculadora procese el cambio de formulario
        await this.page.waitForTimeout(1000);
        });
    }

    async ingresarIngresoMensual(monto: number) {
        await allure.step(`Ingresar el ingreso mensual: ${monto}`, async () => {
        await this.txtIngresoMensual.fill(monto.toString());
        await this.txtIngresoMensual.press('Tab');
         });
    }

    async ingresarMontoSolicitado(monto: number) {
        await allure.step(`Ingresar Monto solicitado: ${monto}`, async () => {
        await this.txtMontoSolicitado.fill(monto.toString());
        await this.txtMontoSolicitado.press('Tab');
        });
    }

    async seleccionarPlazo(plazo: number, min: number, max: number) {
        await allure.step(`Seleccionar Plazo: ${plazo}`, async () => {
        await this.selectorPlazo.scrollIntoViewIfNeeded();
        const box = await this.selectorPlazo.boundingBox();
        if (box) {
            // Calculamos los valores a seleccionar de plazo
            const porcentaje = (plazo - min) / (max - min);
            const clickX = box.x + (box.width * porcentaje); 
            
            await this.page.mouse.click(clickX, box.y + box.height / 2);
            await this.page.waitForTimeout(500); 
        }
      });
    }

   async seleccionarTasa(tasa: number, min: number, max: number) {
        await allure.step(`Seleccionar Tasa: ${tasa}`, async () => {
        await this.selectorTasa.scrollIntoViewIfNeeded();
        const box = await this.selectorTasa.boundingBox();
        if (box) {
            // Calculamos los valores a seleccionar de tasa
            const porcentaje = (tasa - min) / (max - min);
            const clickX = box.x + (box.width * porcentaje);
            
            await this.page.mouse.click(clickX, box.y + box.height / 2);
            await this.page.waitForTimeout(500);
        }
         });
    }

    async validarResultados() {
    //Esperamos a que el texto Monto máximo a financiar sea visible
      await expect(this.page.getByText('Monto máximo a financiar'), 'No se mostró el título de resultados').toBeVisible({ timeout: 15000 });
    
      // Localizadores de los resultados
    const monto = this.page.locator('p:below(:text("Monto máximo a financiar"))').first();
    const cuota = this.page.locator('p:below(:text("Cuota mensual"))').first();

    // Validamos que contengan el simbolo de $
    await expect(monto).toContainText('$', { timeout: 10000 });
    await expect(cuota).toContainText('$', { timeout: 10000 });

    console.log("Resultados validados correctamente");
}
}