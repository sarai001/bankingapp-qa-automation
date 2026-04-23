import { test } from "../fixtures/BaseFixture";
import * as escenarios from "../data/usuariosEscenarios.json";

test("Caso 3: Validación de campos vacíos", async ({ loginPage }) => {

    const user = escenarios.camposVacios;
// Abre el archivo BankingApp.html
    await loginPage.navigate();
// Intento 1: Intenta login con los datos vacíos que vienen del JSON
    await loginPage.login(user.username, user.password);
    // Verifica que el sistema muestra mensaje de error cuando se envían campos vacíos
    await loginPage.expectLoginError("Usuario o contraseña incorrectos.");
// Intento 2: Usuario lleno + Contraseña vacía
    await loginPage.usernameInput.fill("cliente1");
    await loginPage.passwordInput.fill("");
    await loginPage.loginButton.click();
    // Verifica que el sistema rechaza cuando falta la contraseña
    await loginPage.expectLoginError("Usuario o contraseña incorrectos.");
// Intento 3: Usuario vacío + Contraseña llena
    await loginPage.usernameInput.fill("");
    await loginPage.passwordInput.fill("pass1234");
    await loginPage.loginButton.click()
    // Verifica que el sistema rechaza cuando falta el nombre de usuario
    await loginPage.expectLoginError("Usuario o contraseña incorrectos.");
});