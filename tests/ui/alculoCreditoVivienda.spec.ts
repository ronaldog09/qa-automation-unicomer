import { test } from '@playwright/test';
import { CalcularCreditoPage } from '../../pages/CalcularCreditoPage';

test('Crédito Vivienda', async ({ page }) => {
  const credito = new CalcularCreditoPage(page);

  await credito.open();

  await credito.seleccionarTipoCredito(' Vivienda ');
  await credito.seleccionarUsoCredito('Compra de vivienda nueva o usada');

  await credito.ingresarIngresoMensual(3000);
  await credito.ingresarMontoSolicitado(80000);

  await credito.seleccionarPlazo(20);
  await credito.seleccionarTasa(7.95);

  await credito.validarResultados();
});
