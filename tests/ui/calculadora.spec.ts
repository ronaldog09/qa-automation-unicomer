import { test } from '@playwright/test'; 
import { CalcularCreditoPage } from '../../pages/CalcularCreditoPage';
import allureHelper from '../../lib/allure-helper';

const escenarios = [
    { 
        // Datos para crédito de consumo
        tipo: 'Consumo', uso: 'Gastos personales', 
        ingreso: 2500, monto: 20000, 
        plazo: 8, plazoMin: 2, plazoMax: 10, 
        tasa: 11.5, tasaMin: 8.5, tasaMax: 18.5,
        severidad: 'critical' as const,
    },
    { 
        // Datos para crédito de vivienda
        tipo: 'Vivienda', uso: 'Compra de vivienda nueva o usada', 
        ingreso: 4500, monto: 95000, 
        plazo: 20, plazoMin: 5, plazoMax: 30, 
        tasa: 7.95, tasaMin: 6.95, tasaMax: 9,
        severidad: 'normal' as const,
    },
    { 
        // Datos para crédito de vehículo
        tipo: 'Vehículo', uso: 'Compra de vehículo nuevo', 
        ingreso: 3000, monto: 25000, 
        plazo: 6, plazoMin: 2, plazoMax: 8, 
        tasa: 9, tasaMin: 8.5, tasaMax: 9,
        severidad: 'minor' as const,
    } 
];

/*for (const escenario of escenarios) {
    test(`Validar crédito de ${escenario.tipo}`, async ({ page }) => {
        const credito = new CalcularCreditoPage(page);
        await credito.open();

        // Ingresamos los datos del escenario
        await credito.seleccionarTipoCredito(escenario.tipo as any);
        await credito.seleccionarUsoCredito(escenario.uso);
        await credito.ingresarIngresoMensual(escenario.ingreso);
        await credito.ingresarMontoSolicitado(escenario.monto);
        
        // Pasamos el valor deseado junto con los rangos min/max del selector
        await credito.seleccionarPlazo(escenario.plazo, escenario.plazoMin, escenario.plazoMax);
        await credito.seleccionarTasa(escenario.tasa, escenario.tasaMin, escenario.tasaMax);

        await credito.validarResultados();
    });
}*/

for (const escenario of escenarios) {
    test(`Validar crédito de ${escenario.tipo}`, async ({ page }) => {
        // 1. Aplicamos Metadata usando tu helper
        await allureHelper.applyTestMetadata({
            epic: 'Simuladores Bancarios',
            feature: 'Calculadora de Créditos',
            story: `Cálculo para ${escenario.tipo}`,
            severity: escenario.severidad,
            tags: [escenario.tipo, 'Regresión', 'UI']
        });

        const credito = new CalcularCreditoPage(page);
        
        await credito.open();
        await credito.seleccionarTipoCredito(escenario.tipo as any);
        await credito.seleccionarUsoCredito(escenario.uso);
        await credito.ingresarIngresoMensual(escenario.ingreso);
        await credito.ingresarMontoSolicitado(escenario.monto);
        await credito.seleccionarPlazo(escenario.plazo, escenario.plazoMin, escenario.plazoMax);
        await credito.seleccionarTasa(escenario.tasa, escenario.tasaMin, escenario.tasaMax);

        await credito.validarResultados();
    });
}