import { TonerVazio } from '../model/TonerVazio.js';
import { UI } from './TonerVazioUIController.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };

    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static fillFields(receivedId) {
        const tonersVazio = TonerVazio.read();

        tonersVazio.forEach((tonerVazio) => {
            if(tonerVazio.id === receivedId) {
                document.querySelector('#tonerVazioModel-modal').value = tonerVazio.model;
                document.querySelector('#tonerVazioQuant-modal').value = tonerVazio.quant;
            }
        });
    };

    static getValues() {
        return {
            model: document.querySelector('#tonerVazioModel-modal').value,
            quant: document.querySelector('#tonerVazioQuant-modal').value
        }
    };

    static validateFields() {
        const { model, quant } = this.getValues();

        if(model === '' || quant === '') {
            UI.showAlert('Por favor preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#tonerVazioModel-modal').value = '';
        document.querySelector('#tonerVazioQuant-modal').value = '';
    };

    static submit(event, receivedId) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { model, quant } = this.getValues();

                const updatedTonerVazio = {
                    id: receivedId,
                    model,
                    quant
                }

                TonerVazio.update(updatedTonerVazio, receivedId);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }