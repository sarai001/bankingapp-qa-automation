import { test } from "../fixtures/BaseFixture";
import * as escenarios from "../data/usuariosEscenarios.json";

test("Caso 2: Login fallido - credenciales inválidas", async ({ loginPage }) => {
// Carga los datos del escenario de login inválido desde el JSON
    const user = escenarios.loginInvalido;
// Abre el archivo BankingApp.html
    await loginPage.navigate();
    // Intenta hacer login con credenciales incorrectas
    await loginPage.login(user.username, user.password);
// Verifica que apareció el mensaje de error correcto en pantalla

    await loginPage.expectLoginError("Usuario o contraseña incorrectos.");
});