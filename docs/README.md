# QA Automation | Reto tecnico | Unicomer

## Summary
Este proyecto contiene la automatización de pruebas para la Calculadora de Créditos de Banco Cuscatlán con la URL  https://www.bancocuscatlan.com/creditos/calculadora-creditos  y la validación del Endpoint Cat Facts API con la URL https://catfact.ninja/facts . El objetivo es demostrar habilidades en arquitectura de software (POM), manejo de esperas inteligentes, pruebas basadas en datos (DDT) y generación de evidencias técnicas.


## Herramientas
- Framework: Playwright
- Lenguaje: TypeScript
- Editor: Visual Studio Code
- Entorno: Node.js
- Reportes: Playwright HTML Report

## Esctructura del proyecto
- pages/ Implementación del patrón Page Object Model (POM) para la UI.
- tests/ui/ Pruebas funcionales E2E para los flujos de crédito Consumo, Vivienda, Vehiculo.
- tests/api/  Pruebas de integración para la API.
- utils / Test data y ayuda
- evidenciaAPI/ Almacena el archivo catfactsAPI-evidence.json generado dinámicamente con métricas de performance.
- docs/README/ documentacion del proyecto
- Configuración para ejecución en CI/CD.

## Estrategia de Automation 
- Data-Driven Testing (DDT): Se utiliza un único flujo de prueba para validar múltiples tipos de crédito (Vivienda, Vehículo, Consumo) mediante arreglos de datos.
- Resiliencia: Uso de estrategias de navegación domcontentloaded y Locators Relativos para mitigar la inestabilidad de sitios con alta carga de trackers.
- Separación de Capas: Clara distinción entre la lógica de interacción con la UI y la lógica de validación de negocio.

## API ENDPOINT - Cat Facts API
Se valida el contrato de la API, el código de estado (200 OK) y se garantiza un SLA de performance menor a 3000ms. Cada ejecución genera un reporte técnico detallado en la carpeta evidenciaAPI/.

## Comandos de ejecución
- Instalar dependencias: 
    npm install
- Instalar navegadores de Playwright: 
    npx playwright install
- Ejecutar todas las pruebas (UI + API): 
    npx playwright test --project=chromium --headed
- Ejecutar solo la pruebas API: 
    npx playwright test tests/api/catFactsEndPointAPI.spec.ts
- Ver reporte de resultados: 
    npx playwright show-report
- Generar reporte de Allure: 
    npx playwright show-report
- Ver reporte de Allure: 
    npm run allure:open
