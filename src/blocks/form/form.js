import {updateList} from '../list/list';
import {addItem, editItem} from '../list-item/list-item';
import {option} from '../list/list';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;
    option.add = !option.edit;
    const formData = readForm();
    
    if (option.add) {
        addItem( formData );
    } else if(option.edit) {
        editItem( formData );
    }

    updateList();
    clearForm();
}

function validateForm() {
    let valid = false;
    const inputs = readForm();
    let error = { message: '', itemId: '' };

    if (!validateName(inputs.name)) {
        error.message = 'Введите имя и фамилию';
        error.itemId= '#full-name';     
        
    } else if (!validateJob(inputs.occupation)) {
        error.message = 'Поле \'Должность\' должно содержать минимум 5 символов.';
        error.itemId = '#occupation';
    } else if (!validateEmail(inputs.email)) {
        error.message = "Не правильно указан адрес электронной почты";
        error.itemId = '#email';        
    } else if(!validatePhone(inputs.phone)) {
        error.message = 'Не правильно указан номер телефона';
        error.itemId = '#phone';
    } else {
        valid = true;
    }

    valid ? hideErrorMessage() : showErrorMessage(error);
    
    return valid;
}

function readForm() {
    const name = form.fullname.value;
    const occupation = form.occupation.value;
    const email = form.email.value;
    const phone = form.phone.value;

    return {name, occupation, email, phone };
}

function clearForm() {
    form.fullname.value = form.occupation.value = form.email.value = form.phone.value = '';
}

function validateName (name) {
    let words = name.split(' ');
    return words.length === 2;
}

function validateJob (job) {
    return job.length >= 5;
}

function validateEmail(email){
    const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return reg.test(email);
}

function validatePhone(phone) {
    const reg = /^(38|8?)(063)\d{7}(?=\r?\n|)$/;
    return reg.test(phone);
}

export function fillFormInputs(item) {
    form.fullname.value = item.querySelector('.list-item__name').textContent;
    form.occupation.value = item.querySelector('.list-item__occupation').textContent;
    form.email.value = item.querySelector('.list-item__email').textContent.split(' ');
    form.phone.value = item.querySelector('.list-item__phone').textContent;
}

function showErrorMessage(error) {
    const errorLog = form.querySelector('.form__input-error');
    const node = document.querySelector(error.itemId);
    node.after(errorLog);
    errorLog.textContent = error.message;
}

function hideErrorMessage() {
    const errorLog = form.querySelector('.form__input-error');
    errorLog.textContent = '';
}