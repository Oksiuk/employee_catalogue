import {createItemNode} from '../list-item/list-item';
import {deleteItem} from '../list-item/list-item';
import {fillFormInputs} from '../form/form';

export let option = {
    add: true,
    edit: false,
    remove: false
};

export const target = {};

const list = document.querySelector('.list');

export function updateList() { 
    let list = JSON.parse( localStorage.getItem('Employees') );
    renderList(list);
}

function renderList(items) {
    const list = document.querySelector('.list');
    const fragment = document.createDocumentFragment();
    let id = 1;

    items.forEach(item => {
        fragment.append( createItemNode(item, id) );
        ++id;
    });

    list.innerHTML = '';
    list.append(fragment);
}

list.addEventListener('click', function(e) {
    const item = e.target.parentNode.parentNode;

    if (e.target.classList.contains('list-item__btn-edit')) {       
        option = { add: false, edit: true, remove: false };
        fillFormInputs(item);
        target.id = item.id - 1;
    } else if (e.target.classList.contains('list-item__btn-delete')) {
        option = { add: false, edit: false, remove: true }
        deleteItem(item);
        updateList();
    }  
});