
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TransferPage } from '../pages/TransferPage';
import { ClientesPage } from '../pages/ClientesPage';

// Definimos los tipos de nuestros fixtures personalizados
type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    transferPage: TransferPage;
    clientesPage: ClientesPage;
};

// Extendemos el objeto 'test' base de Playwright
// Esto nos permite crear fixtures personalizados que se pueden usar en todos los tests
export const test = baseTest.extend<MyFixtures>({
    // Se crea automáticamente un nuevo objeto LoginPage cada vez que se usa en un test
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    // Fixture para la página principal (Dashboard / Home)
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    // Fixture para la página de Transferencias
    transferPage: async ({ page }, use) => {
        await use(new TransferPage(page));
    },
    // Fixture para la página de Gestión de Clientes
    clientesPage: async ({ page }, use) => {
        await use(new ClientesPage(page));
    },
});

// Exportamos expect para que esté disponible en los tests
export { expect } from '@playwright/test';