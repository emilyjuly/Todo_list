const getBanco = () => JSON.parse(localStorage.getItem ('list')) ?? [];
const setBanco = (banco) => localStorage.setItem ('list', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');  
    item.classList.add('item');  
    item.innerHTML = `
        <input class="checkbox" type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input class="btn" type="button" value="X" data-indice=${indice}>
    `
    document.querySelector('#list').appendChild(item);
}

const limparTarefa = () => {
    const list = document.querySelector('#list');
    while (list.firstChild){
        list.removeChild(list.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefa();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const texto = evento.target.value;
    const tecla = evento.key;
        if (tecla === 'Enter'){
            const banco = getBanco();
            banco.push ({'tarefa' : texto, 'status' : ''});
            setBanco(banco);
            atualizarTela();
            evento.target.value = '';
        }
}

const removerItem = (indice) =>{
    const banco = getBanco();
    banco.splice (indice,1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) =>{
    const banco = getBanco ();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }
    else if (elemento.type == 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('item').addEventListener('keypress', inserirItem);
document.querySelector('#list').addEventListener('click', clickItem);

atualizarTela();

