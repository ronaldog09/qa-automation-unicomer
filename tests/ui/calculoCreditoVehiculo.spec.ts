import { test } from '@playwright/test';
import { CalcularCreditoPage } from '../../pages/CalcularCreditoPage';

test.describe('Calculadora de Crédito - Vehículo', () => {
  test('Vehículo - Compra de vehículo nuevo', async ({ page }) => {
    const credito = new CalcularCreditoPage(page);

    await credito.open();
    await credito.seleccionarTipoCredito(' Vehículo ');
    await credito.seleccionarUsoCredito(' Compra de vehículo nuevo ');

    await credito.ingresarIngresoMensual(3000);
    await credito.ingresarMontoSolicitado(25000);

    await credito.seleccionarPlazo(6); // 2 a 8 años
    await credito.seleccionarTasa(9);

    await credito.validarResultados();
  });
});
