import { Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    // Muestra el nombre del usuario logueado
    get userDisplay() { return this.page.locator('#user-display'); }
    // Muestra el saldo actual del usuario
    get balanceDisplay() { return this.page.locator('#balance-display'); }
    // Botón para cerrar sesión
    get logoutButton() { return this.page.locator('.btn-logout'); }

    // PESTAÑAS DE NAVEGACIÓN
    // Pestaña para ir a la sección de Transferencias
    get transferenciasTab() { return this.page.locator('button.nav-tab', { hasText: 'Transferencias' }); }
    // Pestaña para ir a la sección de Gestión de Clientes
    get clientesTab() { return this.page.locator('button.nav-tab', { hasText: 'Clientes' }); }

    // Transferencia locators
    get transferSourceAccount() { return this.page.locator('#t-cuenta-origen'); }
    get transferDestinationAccount() { return this.page.locator('#t-cuenta-destino'); }
    get transferBeneficiary() { return this.page.locator('#t-beneficiario'); }
    get transferAmount() { return this.page.locator('#t-monto'); }
    get transferDescription() { return this.page.locator('#t-descripcion'); }
    get transferButton() { return this.page.locator('button[onclick="doTransfer()"]'); }
    get transferSuccessMessage() { return this.page.locator('#transfer-success'); }
    get transferErrorMessage() { return this.page.locator('#transfer-error'); }

    // Client locators
    get addClientButton() { return this.page.locator('[data-testid="btn-add-client"]'); }
    get clientSearchInput() { return this.page.locator('#client-search'); }
    get clientsTableBody() { return this.page.locator('#clients-tbody'); }
    get modalClient() { return this.page.locator('#modal-client'); }
    get clientNameInput() { return this.page.locator('#c-nombre'); }
    get clientEmailInput() { return this.page.locator('#c-correo'); }
    get clientPhoneInput() { return this.page.locator('#c-telefono'); }
    get clientTypeSelect() { return this.page.locator('#c-tipo'); }
    get clientStatusSelect() { return this.page.locator('#c-estado'); }
    get saveClientButton() { return this.page.locator('[data-testid="btn-save-client"]'); }

// ====================== MÉTODOS DE ACCIÓN ======================
    // Verifica que el usuario está correctamente logueado en el Dashboard
    async expectLoggedIn() {
        await expect(this.page.locator('#screen-app')).toBeVisible();
    }
// Navega a la sección de Transferencias
    async navigateToTransferencias() {
        await this.transferenciasTab.click();
        await expect(this.transferenciasTab).toBeVisible();
    }
// Navega a la sección de Clientes
    async navigateToClientes() {
        await this.clientesTab.click();
        await expect(this.page.locator('#tab-clientes')).toHaveClass(/active/);
    }
// Realiza una transferencia completa
    async performTransfer(destination: string, beneficiary: string, amount: string, description: string) {
        await this.transferSourceAccount.selectOption({ index: 1 });
        await this.transferDestinationAccount.fill(destination);
        await this.transferBeneficiary.fill(beneficiary);
        await this.transferAmount.fill(amount);
        await this.transferDescription.fill(description);
        await this.transferButton.click();
    }
// Agrega un nuevo cliente desde el modal
    async addClient(name: string, email: string, phone: string, type: string, status: string) {
        await this.addClientButton.click();
        await expect(this.modalClient).toBeVisible();
        await this.clientNameInput.fill(name);
        await this.clientEmailInput.fill(email);
        await this.clientPhoneInput.fill(phone);
        await this.clientTypeSelect.selectOption(type);
        await this.clientStatusSelect.selectOption(status);
        await this.saveClientButton.click();
    }
    // Cierra la sesión y verifica que vuelve a la pantalla de login
    async logout() {
        await this.logoutButton.click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.page.locator('#screen-login')).toBeVisible();
    }
}