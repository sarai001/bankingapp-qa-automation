import { test, expect } from "../fixtures/BaseFixture";
import * as usuarios from "../data/usuarios.json";
import * as transferencias from "../data/transferencias.json";

test("Caso 5: Transferencia exitosa - Transferir dinero con datos válidos", async ({ loginPage, homePage }) => {
// Carga los datos del usuario que va a hacer login
    const user = usuarios.cliente1;
    // Carga los datos de una transferencia válida desde el JSON
    const transfer = transferencias.transferenciaValida;
//abre la pagina
    await loginPage.navigate();
    // se hace el login
    await loginPage.login(user.username, user.password);
    // Ingresa automáticamente el código OTP
    await loginPage.verifyOtp();
// entra a la pagina principal
    await homePage.expectLoggedIn();
// va a pestaña de transferencia
    await homePage.navigateToTransferencias();
// Hace el procedimiento de la transferencia
    await homePage.performTransfer(
        transfer.destination,
        transfer.beneficiary,
        transfer.amount,
        transfer.description
    );
// verifica la operacion exitosa
    await expect(homePage.transferSuccessMessage).toBeVisible();

// Verifica que el mensaje de éxito contenga el texto esperado
    await expect(homePage.transferSuccessMessage)
        .toHaveText(/Transferencia realizada con éxito/i);
});