import { UI } from './controller/TonerVazioUIController.js'
import { Form } from './controller/TonerVazioFormController.js'
import { Toner } from './model/TonerVazio.js'
import { Modal } from './controller/TonerVazioModalController.js'

// ----- EVENTOS -----

// Evento: Listar toners
document.addEventListener('DOMContentLoaded', UI.showToners);

// Evento: Adicionar um toner
document.querySelector('#toner-vazio-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar um toner
document.querySelector('#toner-vazio-list').addEventListener('click', (event) => {
    // remover
    if(event.target.classList.contains('delete')) {
        Toner.delete(event.target.parentElement.parentElement.firstElementChild.textContent);
        UI.removeToner(event.target);
        UI.showAlert('Toner deletado', 'success');
    }

    // editar
    if(event.target.classList.contains('edit')) {
        const id = parseInt(event.target.parentElement.parentElement.firstElementChild.textContent);

        Modal.open();
        Modal.fillFields(id);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, id);
            Modal.close();
        });
    };
});
