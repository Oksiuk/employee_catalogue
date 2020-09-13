export function getData() {
    return JSON.parse( localStorage.getItem('Employees') );
}

 export function setData(data) {
    localStorage.setItem('Employees', JSON.stringify(data) );
}