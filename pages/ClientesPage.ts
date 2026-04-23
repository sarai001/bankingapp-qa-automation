import { Page } from '@playwright/test';

export class ClientesPage {
    constructor(private page: Page) {}

    // ========== SELECTORES ==========
    // Botones y controles principales
    private btnAddClient = '[data-testid="btn-add-client"]';
    private clientSearch = '[data-testid="client-search"]';
    private clientsTable = '[data-testid="clients-table"]';

    // Modal de agregar/editar cliente
    private modalClient = '[data-testid="modal-client"]';
    private modalTitle = '.modal-title';
    private clientNombre = '[data-testid="client-nombre"]';
    private clientCorreo = '[data-testid="client-correo"]';
    private clientTelefono = '[data-testid="client-telefono"]';
    private clientTipo = '[data-testid="client-tipo"]';
    private clientEstado = '[data-testid="client-estado"]';
    private btnSaveClient = '[data-testid="btn-save-client"]';
    private btnCancelClient = '[data-testid="btn-cancel-client"]';
    private modalClientError = '[data-testid="modal-client-error"]';

    // Modal de eliminar
    private modalDelete = '[data-testid="modal-delete"]';
    private btnConfirmDelete = '[data-testid="btn-confirm-delete"]';
    private btnCancelDelete = '[data-testid="btn-cancel-delete"]';

    // ========== MÉTODOS DE APERTURA Y CIERRE ==========

    /**
     * Abre el modal para agregar un nuevo cliente
     */
    async abrirModalAgregarCliente(): Promise<void> {
        await this.page.click(this.btnAddClient);
        await this.page.waitForSelector(this.modalClient, { state: 'visible' });
    }

    /**
     * Cierra el modal de cliente
     */
    async cerrarModal(): Promise<void> {
        await this.page.click(this.btnCancelClient);
        await this.page.waitForSelector(this.modalClient, { state: 'hidden', timeout: 5000 });
    }

    /**
     * Espera a que el modal se cierre
     */
    async esperarQueCierreModal(): Promise<void> {
        await this.page.waitForSelector(this.modalClient, { state: 'hidden', timeout: 5000 });
    }

    // ========== MÉTODOS DE CRUD ==========

    /**
     * Agrega un nuevo cliente
     * @param datos - Objeto con los datos del cliente
     */
    async agregarCliente(datos: {
        nombre: string;
        correo: string;
        telefono: string;
        tipo: string;
        estado: string;
    }): Promise<void> {
        await this.page.fill(this.clientNombre, datos.nombre);
        await this.page.fill(this.clientCorreo, datos.correo);
        await this.page.fill(this.clientTelefono, datos.telefono);
        await this.page.selectOption(this.clientTipo, datos.tipo);
        await this.page.selectOption(this.clientEstado, datos.estado);
        await this.page.click(this.btnSaveClient);
    }

    /**
     * Busca un cliente por texto (nombre o correo)
     * @param texto - Texto a buscar
     */
    async buscarCliente(texto: string): Promise<void> {
        await this.page.fill(this.clientSearch, texto);
        // Pequeña pausa para que filtre
        await this.page.waitForTimeout(500);
    }

    /**
     * Limpia el buscador de clientes
     */
    async limpiarBusqueda(): Promise<void> {
        await this.page.fill(this.clientSearch, '');
    }

    /**
     * Verifica si un cliente existe en la tabla
     * @param correo - Correo del cliente a buscar
     */
    async clienteExisteEnTabla(correo: string): Promise<boolean> {
        const row = this.page.locator(`tr:has-text("${correo}")`);
        return await row.isVisible();
    }

    /**
     * Obtiene el texto de un cliente específico
     * @param correo - Correo del cliente
     */
    async obtenerClientePorCorreo(correo: string): Promise<string | null> {
        const row = this.page.locator(`tr:has-text("${correo}")`);
        if (await row.isVisible()) {
            return await row.textContent();
        }
        return null;
    }

    // ========== MÉTODOS DE VALIDACIÓN ==========

    /**
     * Obtiene el mensaje de error del modal
     */
    async obtenerMensajeError(): Promise<string | null> {
        const element = this.page.locator(this.modalClientError);
        if (await element.isVisible()) {
            return await element.textContent();
        }
        return null;
    }

    /**
     * Verifica si el modal de cliente está visible
     */
    async estaModalVisible(): Promise<boolean> {
        return await this.page.locator(this.modalClient).isVisible();
    }

    /**
     * Verifica si la tabla de clientes está visible
     */
    async estaTablaVisible(): Promise<boolean> {
        return await this.page.locator(this.clientsTable).isVisible();
    }

    /**
     * Obtiene el título del modal
     */
    async obtenerTituloModal(): Promise<string> {
        return await this.page.textContent(this.modalTitle) || '';
    }

    // ========== MÉTODOS PARA VALIDACIÓN DE CORREO ÚNICO ==========

    /**
     * Verifica si un correo ya existe en la tabla
     * @param correo - Correo a verificar
     */
    async correoYaExiste(correo: string): Promise<boolean> {
        await this.buscarCliente(correo);
        const existe = await this.clienteExisteEnTabla(correo);
        await this.limpiarBusqueda();
        return existe;
    }
}