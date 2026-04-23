import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";
import * as clientes from "../data/clientes.json";

test("Caso 7: Creación de cliente (correo único) - Agregar nuevo cliente con correo válido y no duplicado", async ({ loginPage, homePage, clientesPage }) => {

    const admin = usuarios.admin;
    const newClient = clientes.nuevoCliente;

    // PASO 1: Login
    await loginPage.navigate();
    await loginPage.login(admin.username, admin.password);
    await loginPage.verifyOtp();

    // PASO 2: Verificar que estamos logueados
    await homePage.expectLoggedIn();

    // PASO 3: Navegar a la sección de Clientes
    await homePage.navigateToClientes();

    // PASO 4: Abrir modal para agregar cliente (usando clientesPage)
    await clientesPage.abrirModalAgregarCliente();

    // PASO 5: Agregar el nuevo cliente
    await clientesPage.agregarCliente({
        nombre: newClient.name,
        correo: newClient.email,
        telefono: newClient.phone,
        tipo: newClient.type,
        estado: newClient.status
    });

    // PASO 6: Esperar que el modal se cierre
    await clientesPage.esperarQueCierreModal();

    // PASO 7: Buscar el cliente por correo
    await clientesPage.buscarCliente(newClient.email);

    // PASO 8: Verificar que el cliente existe en la tabla
    const existe = await clientesPage.clienteExisteEnTabla(newClient.email);
    expect(existe).toBe(true);

    // PASO 9: Verificar que el nombre aparece en la tabla
    const clienteTexto = await clientesPage.obtenerClientePorCorreo(newClient.email);
    expect(clienteTexto).toContain(newClient.name);
    expect(clienteTexto).toContain(newClient.email);

    // PASO 10: Limpiar búsqueda (opcional)
    await clientesPage.limpiarBusqueda();
});