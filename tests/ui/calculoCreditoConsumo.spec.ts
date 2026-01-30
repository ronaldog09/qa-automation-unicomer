import { test } from '@playwright/test';
import { CalcularCreditoPage } from '../../pages/CalcularCreditoPage';

test.describe('Calculadora de Crédito - Consumo', () => {
  test('Consumo - Gastos personales', async ({ page }) => {
    const credito = new CalcularCreditoPage(page);

    await credito.open();
    await credito.seleccionarTipoCredito(' Consumo ');
    await credito.seleccionarUsoCredito('Gastos personales');

    await credito.ingresarIngresoMensual(2500);
    await credito.ingresarMontoSolicitado(20000);

    await credito.seleccionarPlazo(8); // 2 a 10 años
    await credito.seleccionarTasa(11.5); // 8.5% a 15%

    await credito.validarResultados();
  });
});
