console.log(localStorage.length);

const url = "http://localhost:3000/generate"

const data = {
    test: "test"
}
const promptPrestatyn = "Tell me a curious story about the coast of Prestatyn. Something to keep me entertained while I continue my bike ride."
const promptLlandudno = "We've arrived at Llandudno! What can you tell me about this place? Anything special?";
const promptLlanfairfechan = "And our trip is done. We ended up in Llanfairfechan. Any history or stories to wrap this trip up?";
let promptArray = [promptPrestatyn, promptLlandudno, promptLlanfairfechan];


let checkLocalStorage = async () => {
    let checkIfEmpty = window.localStorage.length;
    if (checkIfEmpty == 0) {
        console.log("test");
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            localStorage.setItem(element.key, data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    } else return localStorage.getItem();
}

checkLocalStorage()


promptArray.map((promt) => {
    console.log(promt);
})