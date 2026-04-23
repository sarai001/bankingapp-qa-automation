

BankingApp es una plataforma de banca digital del banco FinanTrust, diseñada para permitir a los clientes realizar operaciones bancarias de forma segura, rapida y disponible 24/7.

Este repositorio contiene la suite de automatizacion de pruebas desarrollada para validar las funcionalidades criticas del sistema, implementando buenas practicas como:

- Page Object Model (POM)
- Datos de prueba externalizados (JSON)
- Integracion continua con GitHub Actions
- Pruebas multi-navegador

Funcionalidades probadas

| Funcionalidad | Descripcion | Prioridad |
|---------------|-------------|-----------|
| Login con OTP | Autenticacion segura de dos factores | Alta |
| Consulta de saldo | Visualizacion de saldo en tiempo real | Alta |
| Transferencias | Transferencias entre cuentas | Muy Alta |
| Pago de servicios | Pago de servicios públicos | Media |
| Gestion de clientes | CRUD de clientes (solo administradores) | Media |
| Cierre de sesion | Finalizacion segura de la sesion | Media |

---

 Resultados de Pruebas

Resumen general

| Metrica | Resultado | Meta | Estado |
|---------|-----------|------|--------|
| Tasa de exito | 97.5% | >= 90% | Superada |
| Total de pruebas | 40 | - | - |
| Pruebas pasadas | 39 | - | - |
| Pruebas fallidas | 1 | 0 | Safari (conocido) |
| Cobertura critica | 100% | >= 80% | Superada |
| Tiempo de ejecucion | ~35 segundos | < 5 min | Superada |

### Detalle de pruebas

| No. | Prueba | Chromium | Firefox | Edge | WebKit |
|-----|--------|----------|---------|------|--------|
| 01 | Login exitoso | Aprobado | Aprobado | Aprobado | Aprobado  |
| 02 | Login fallido | Aprobado | Aprobado | Aprobado | Aprobado |
| 03 | Validacion campos vacios | Aprobado | Aprobado | Aprobado | Aprobado |
| 04 | Consulta de saldo | Aprobado | Aprobado | Aprobado | Fallido |
| 05 | Transferencia exitosa | Aprobado | Aprobado | Aprobado | Aprobado |
| 06 | Transferencia saldo insuficiente | Aprobado | Aprobado | Aprobado | Aprobado |
| 07 | Creacion de cliente | Aprobado | Aprobado | Aprobado | Aprobado |
| 08 | Cierre de sesion | Aprobado | Aprobado | Aprobado | Aprobado |

**Nota:** El navegador WebKit (Safari) presenta problemas de compatibilidad conocidos con la aplicacion BankingApp. Las pruebas son 100% exitosas en Chrome, Firefox y Edge.

---

## Tecnologias Utilizadas

| Tecnologia | Version | Propósito |
|------------|---------|-----------|
| Playwright | 1.40+ | Automatizacion end-to-end |
| TypeScript | 5.x | Tipado estatico |
| Node.js | 18+ | Entorno de ejecucion |
| GitHub Actions | - | CI/CD Pipeline |
| Git | - | Control de versiones |

---
## Instalacion y ejecucion

```bash
git clone https://github.com/sarai001/bankingapp-qa-automation.git
cd bankingapp-qa-automation
npm install
npx playwright install
npx playwright test


