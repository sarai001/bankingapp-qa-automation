import { Page } from '@playwright/test';

export class TransferPage {
    constructor(private page: Page) {}

    // ========== SELECTORES ==========
    private cuentaOrigen = '[data-testid="transfer-cuenta-origen"]';
    private cuentaDestino = '[data-testid="transfer-cuenta-destino"]';
    private beneficiario = '[data-testid="transfer-beneficiario"]';
    private monto = '[data-testid="transfer-monto"]';
    private tipo = '[data-testid="transfer-tipo"]';
    private descripcion = '[data-testid="transfer-descripcion"]';
    private btnTransferir = '[data-testid="btn-transferir"]';
    private transferSuccess = '[data-testid="transfer-success"]';
    private transferError = '[data-testid="transfer-error"]';

    // ========== MÉTODOS PRINCIPALES ==========

    /**
     * Realiza una transferencia bancaria
     * @param datos - Objeto con los datos de la transferencia
     */
    async realizarTransferencia(datos: {
        cuentaDestino: string;
        beneficiario: string;
        monto: number;
        tipo: string;
        descripcion?: string;
    }): Promise<void> {
        await this.page.fill(this.cuentaDestino, datos.cuentaDestino);
        await this.page.fill(this.beneficiario, datos.beneficiario);
        await this.page.fill(this.monto, datos.monto.toString());
        await this.page.selectOption(this.tipo, datos.tipo);

        if (datos.descripcion) {
            await this.page.fill(this.descripcion, datos.descripcion);
        }

        await this.page.click(this.btnTransferir);
    }

    /**
     * Selecciona la cuenta de origen
     * @param cuenta - Número de cuenta
     */
    async seleccionarCuentaOrigen(cuenta: string): Promise<void> {
        await this.page.selectOption(this.cuentaOrigen, cuenta);
    }

    /**
     * Obtiene el mensaje de éxito de la transferencia
     */
    async obtenerMensajeExito(): Promise<string | null> {
        const element = this.page.locator(this.transferSuccess);
        if (await element.isVisible()) {
            return await element.textContent();
        }
        return null;
    }

    /**
     * Obtiene el mensaje de error de la transferencia
     */
    async obtenerMensajeError(): Promise<string | null> {
        const element = this.page.locator(this.transferError);
        if (await element.isVisible()) {
            return await element.textContent();
        }
        return null;
    }

    /**
     * Espera a que aparezca el mensaje de éxito
     */
    async esperarMensajeExito(): Promise<void> {
        await this.page.waitForSelector(this.transferSuccess, { state: 'visible', timeout: 5000 });
    }

    /**
     * Espera a que aparezca el mensaje de error
     */
    async esperarMensajeError(): Promise<void> {
        await this.page.waitForSelector(this.transferError, { state: 'visible', timeout: 5000 });
    }

    /**
     * Limpia el formulario de transferencia
     */
    async limpiarFormulario(): Promise<void> {
        await this.page.fill(this.cuentaDestino, '');
        await this.page.fill(this.beneficiario, '');
        await this.page.fill(this.monto, '');
        await this.page.fill(this.descripcion, '');
    }

    /**
     * Verifica si el formulario de transferencia está visible
     */
    async estaVisible(): Promise<boolean> {
        return await this.page.locator(this.btnTransferir).isVisible();
    }
}