import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";

test("Caso 4: Consulta de saldo - Verificar que el saldo mostrado sea correcto", async ({ loginPage, homePage }) => {
// Carga los datos del usuario cliente1 desde el JSON
    const user = usuarios.cliente1;
// Abre el archivo BankingApp.html
    await loginPage.navigate();
    // Realiza el login con usuario y contraseña
    await loginPage.login(user.username, user.password);
    // Ingresa automáticamente el código OTP
    await loginPage.verifyOtp();
    // Verifica que el usuario entró correctamente a la paginaprincipal
    await homePage.expectLoggedIn();

    // espacio invisible corregido
    await expect(homePage.balanceDisplay).toHaveText(/8\s*432/);
});