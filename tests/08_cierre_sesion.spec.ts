import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";

test("Caso 8: Cierre de sesión (Logout) - Cerrar sesión y verificar redirección al login", async ({ loginPage, homePage }) => {

    const user = usuarios.cliente1;

    await loginPage.navigate();
    await loginPage.login(user.username, user.password);
    await loginPage.verifyOtp();

    await homePage.expectLoggedIn();
//lo saca de la pagina principal y lo envia al login
    await homePage.logout();
//cuandoo lo saca de la pagina principal
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
});

/// solo lo lleva a la pagina principal y lo saca