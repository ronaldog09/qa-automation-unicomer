import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('Cat Facts API EndPoint Test', () => {
   test('Validar GET cat facts API - retorna una respuesta valida', async ({ request  }) => 
    {
        const startTime = Date.now();
        const respuesta = await request.get('https://catfact.ninja/facts', {
            headers: { accept: 'application/json' },
        });    
        const responseTime = Date.now() - startTime;

        // Validaciones requeridas
        const statusCodeValidation = respuesta.status() === 200; // Verificar que el codigo de estado sea 200
        const body = await respuesta.json();
        const notEmptyValidation = body && body.data && body.data.length > 0; // Verificar que la respuesta no este vacía
        const responseTimeValidation = responseTime < 3000; // Verificar que el tiempo de respuesta sea menor a 3 segundos

        expect(statusCodeValidation).toBeTruthy();
        expect(notEmptyValidation).toBeTruthy();
        expect(responseTimeValidation).toBeTruthy();

        // Evidencia de la prueba
        const evidencia = {
            endpoint: 'GET /facts',
            validations: {
            statusCode200: statusCodeValidation,
            responseNotEmpty: notEmptyValidation,
            responseTimeUnder3000ms: responseTimeValidation,
            },
            metrics: {
            statusCode: respuesta.status(),
            responseTimeMs: responseTime,
            dataLength: body.data.length,
            },
            timestamp: new Date().toISOString(),
        };

        fs.mkdirSync('evidenciaAPI', { recursive: true });
        fs.writeFileSync(
            'evidenciaAPI/catfactsAPI-evidence.json',
            JSON.stringify(evidencia, null, 2)
    );
  });
});
