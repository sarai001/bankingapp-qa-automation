import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    // Campo para ingresar el nombre de usuario
    get usernameInput() { return this.page.locator('#username'); }
    // Campo para ingresar la contraseña
    get passwordInput() { return this.page.locator('#password'); }
    // Botón que ejecuta el login
    get loginButton() { return this.page.locator('button[onclick="doLogin()"]'); }
    // Mensaje de error que aparece cuando el login falla
    get loginErrorMessage() { return this.page.locator('#login-error'); }
    // ====================== LOCATORS PARA OTP (Código de verificación)
    get otpInput1() { return this.page.locator('#otp1'); }
    get otpInput2() { return this.page.locator('#otp2'); }
    get otpInput3() { return this.page.locator('#otp3'); }
    get otpInput4() { return this.page.locator('#otp4'); }
    get otpInput5() { return this.page.locator('#otp5'); }
    get otpInput6() { return this.page.locator('#otp6'); }
    get otpDisplay() { return this.page.locator('#otp-display'); }
//Sirve para encontrar el boton verificar codigo otp
    get verifyOtpButton() { return this.page.locator('button[onclick="verifyOTP()"]'); }
// Navega a la página de BankingApp (abre el archivo HTML)
    async navigate() {
        await this.page.goto('./BankingApp.html');
    }
// Realiza el login ingresando usuario y contraseña
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
// Ingresa automáticamente el código OTP que muestra la aplicación
    async verifyOtp() {
        const otpCode = await this.otpDisplay.textContent();
        if (!otpCode) throw new Error('OTP code not found');
        await this.otpInput1.fill(otpCode[0]);
        await this.otpInput2.fill(otpCode[1]);
        await this.otpInput3.fill(otpCode[2]);
        await this.otpInput4.fill(otpCode[3]);
        await this.otpInput5.fill(otpCode[4]);
        await this.otpInput6.fill(otpCode[5]);
        await this.verifyOtpButton.click();
    }
// Verifica que apareció un mensaje de error al intentar login
    async expectLoginError(message: string) {
        await expect(this.loginErrorMessage).toBeVisible();
        await expect(this.loginErrorMessage).toHaveText(message);
    }
}