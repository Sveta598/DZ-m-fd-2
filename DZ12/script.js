function getCurrencyTable(content) {
    let list = document.querySelector('.table');

    let key;
    
    for (key in content) {
        list.innerHTML += `
        
        <tr>
            <td class="cell">${content[key].Cur_Abbreviation}</td>
            <td class="cell">${content[key].Cur_ID}</td>
            <td class="cell">${content[key].Cur_Name}</td>
            <td class="cell">${content[key].Cur_OfficialRate}</td>
            <td class="cell">${content[key].Cur_Scale}</td>
            <td class="cell">${content[key].Date}</td>         
        </tr>
        ` 
    }
}

if (window.Worker) {
    const worker = new Worker('worker.js');
    worker.postMessage('do something');
    worker.addEventListener('message', function(event) {
        getCurrencyTable(event.data);       
    });   
}