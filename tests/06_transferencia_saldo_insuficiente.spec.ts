import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";
import * as transferencias from "../data/transferencias.json";

test("Caso 6: Transferencia con saldo insuficiente - Intentar transferir más del saldo disponible", async ({ loginPage, homePage }) => {
// Carga los datos del usuario que va a hacer login y Carga los datos de una transferencia inválida
    const user = usuarios.cliente1;
    const transfer = transferencias.transferenciaInvalida;

    await loginPage.navigate();
    await loginPage.login(user.username, user.password);
    await loginPage.verifyOtp();

    await homePage.expectLoggedIn();

    await homePage.navigateToTransferencias();
// Intenta realizar la transferencia con monto mayor al saldo disponible
    await homePage.performTransfer(
        transfer.destination,
        transfer.beneficiary,
        transfer.amount,
        "Transferencia grande"
    );
// Verifica que apareció el mensaje de error en pantalla
    await expect(homePage.transferErrorMessage).toBeVisible();

    await expect(homePage.transferErrorMessage)
        .toHaveText("⚠ Saldo insuficiente para realizar la transferencia.");
});