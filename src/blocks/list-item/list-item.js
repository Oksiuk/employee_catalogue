import {target} from '../list/list'
import{getData, setData} from '../app/app';

export function createItemNode(obj, id) {
    const listItem = document.createElement('li');
    listItem.className= 'list-item list__item';
    listItem.id = id;

    const inner = ` <p class="list-item__name">${obj.name}</p>
                    <p class="list-item__occupation">${obj.occupation}</p>
                    <p class="list-item__contacts">
                         <span class="list-item__email">${obj.email}</span>
                         <span class="list-item__phone">${obj.phone}</span>
                    </p>
                    <div class="list-item__options">
                        <div class="list-item__btn-edit"></div>
                        <div class="list-item__btn-delete"></div>
                    </div>`;
    listItem.insertAdjacentHTML('afterbegin', inner);

    return listItem;
}

export function addItem(item) {
    let data = localStorage.getItem('Employees');
    data = data ?  getData() : [];
    data.push( {
        name: item.name,
        occupation: item.occupation,
        email: item.email,
        phone: item.phone 
    });
    setData(data);
}

export function editItem(item) {
    let data =  getData();
    data.splice(target.id, 1, {
        name: item.name,
        occupation: item.occupation,
        email: item.email,
        phone: item.phone 
    });
    setData(data);
}

export function deleteItem(item) {
    let data = getData();
    const index = item.id - 1;
    data.splice(index, 1);
    setData(data);
}