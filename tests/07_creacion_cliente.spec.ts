import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";
import * as clientes from "../data/clientes.json";

test("Caso 7: Creación de cliente (correo único) - Agregar nuevo cliente con correo válido y no duplicado", async ({ loginPage, homePage }) => {

    const admin = usuarios.admin;
    const newClient = clientes.nuevoCliente;

    await loginPage.navigate();
    await loginPage.login(admin.username, admin.password);
    await loginPage.verifyOtp();

    await homePage.expectLoggedIn();
// abre la  sección de clientes
    await homePage.navigateToClientes();
    // crea un nuevo cliente
    await homePage.addClient(
        newClient.name,
        newClient.email,
        newClient.phone,
        newClient.type,
        newClient.status
    );
// Verifica que el formulario de creación de cliente ya no esté visible
    await expect(homePage.modalClient).not.toBeVisible();
// Busca el cliente recién creado usando su correo electrónico
    await homePage.clientSearchInput.fill(newClient.email);
    // Verifica que el nombre del cliente aparezca en la tabla de resultados
    await expect(homePage.clientsTableBody).toContainText(newClient.name);
    // Verifica que el correo del cliente aparezca en la tabla de resultado
    await expect(homePage.clientsTableBody).toContainText(newClient.email);
});