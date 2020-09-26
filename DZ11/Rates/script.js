if (window.Worker) {
    const worker = new Worker('worker.js');
    worker.postMessage('do something');
    worker.addEventListener('message', function(event) {
        receiving(event.data);       
    });   
}