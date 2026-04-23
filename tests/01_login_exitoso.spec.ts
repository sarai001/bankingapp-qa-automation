// Esto permite usar los Page Objects (loginPage, homePage, etc.) de forma automática
import { test, expect } from "../fixtures/BaseFixture";
// 'usuarios' contiene los usuarios de prueba (cliente1, inválido, etc.)
import * as usuarios from "../data/usuarios.json";

test("Caso 1: Login exitoso - Usuario cliente1 con contraseña pass1234 accede al sistema", async ({ loginPage, homePage }) => {
// Carga los datos del usuario "cliente1" desde el JSON
    const user = usuarios.cliente1;

    // Paso 1: Ir a la página
    await loginPage.navigate();

    // Paso 2: Login
    await loginPage.login(user.username, user.password);
// Ingresa automáticamente el código OTP que muestra la aplicación
    await loginPage.verifyOtp();
// Verifica que el usuario llegó correctamente al Dashboard (pantalla principal)
    await homePage.expectLoggedIn();
// Verifica que en el Dashboard aparece el nombre correcto del usuario logueado
    await expect(homePage.userDisplay).toHaveText(user.name);
});