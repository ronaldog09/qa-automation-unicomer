import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Cat Facts API EndPoint Test', () => {
    
    test('Validar GET cat facts API - retorna una respuesta valida', async ({ request }) => {
        const endpoint = 'https://catfact.ninja/facts';
        const startTime = Date.now();

        // 1. Ejecución de la petición
        const respuesta = await request.get(endpoint, {
            headers: { 
                'accept': 'application/json',
                // El token es opcional en este GET público, pero se incluyo para simular un entorno real
                'X-CSRF-TOKEN': 'mHGbUZakX6xN3cYrRO2d2ct9wIFlq0nEJcKXnXu2' 
            },
        });

        const responseTime = Date.now() - startTime;
        const body = await respuesta.json();

        
        // Validación STATUS CODE = 200
        expect(respuesta.status(), 'El Status Code debe ser 200').toBe(200);

        // Validación Que no responda vacío y tenga la estructura esperada
        expect(body, 'El cuerpo de la respuesta no debe ser nulo').toBeDefined();
        expect(Array.isArray(body.data), 'La propiedad "data" debe ser un arreglo').toBeTruthy();
        expect(body.data.length, 'La respuesta debe contener al menos un resultado').toBeGreaterThan(0);

        // Validación Performance - Respuesta en menos de 3000ms
        expect(responseTime, `El tiempo de respuesta (${responseTime}ms) excedió el límite de 3000ms`).toBeLessThan(3000);

        // Preparación de Evidencia
        const evidencia = {
            testName: 'Validación Funcional y de Performance - Cat Facts',
            endpoint: 'GET /facts',
            dateTime: new Date().toISOString(),
            metrics: {
                statusCode: respuesta.status(),
                responseTimeMs: responseTime,
                totalRecords: body.data.length,
            },
            validations: {
                isStatus200: respuesta.status() === 200,
                isNotNull: !!body.data,
                isPerformanceOk: responseTime < 3000
            },
            sampleData: body.data[0] // Guardamos el primer registro como se muestra
        };

        // Exportamos resultados a carpeta evidenciasAPI
        const evidencePath = path.join(process.cwd(), 'evidenciaAPI');
        if (!fs.existsSync(evidencePath)) {
            fs.mkdirSync(evidencePath, { recursive: true });
        }

        fs.writeFileSync(
            path.join(evidencePath, 'catfactsAPI-evidence.json'),
            JSON.stringify(evidencia, null, 2)
        );

        // Log en consola para validar que funciona desde la consola
        console.log(`Test API ENDPOINT GET completado. Status Code: ${respuesta.status()}, Tiempo ejecutado: ${responseTime}ms`);
    });
});