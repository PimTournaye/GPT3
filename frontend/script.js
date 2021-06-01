//console.log(localStorage.length);

const url = "http://localhost:3000"

/*const data = {
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
})*/


const promtArray = [
    ["Prestatyn","Tell me a curious story about the coast of Prestatyn. Something to keep me entertained while I continue my bike ride."],
    ["Llandudno","We've arrived at Llandudno! What can you tell me about this place? Anything special?"],
    ["Llanfairfechan","And our trip is done. We ended up in Llanfairfechan. Any history or stories to wrap this trip up?"]
    
];

let resultArray = [];


async function postRequest($prompt){
    const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify($prompt)
    };

    try{
        const fetchResponse = await fetch(`${url}/generate`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderButtons(prompts){
    let HTMLStream = "";
    prompts.map((prompt, index) => {

        console.log(prompt);

        HTMLStream += `
            <h3>First stop: ${prompt[0]}</h3>
            <span class="generated-text" id="p-${index}">${prompt[1]}</span>
            <button class="generate-button" id="b-${index}">Generate</button>
        `;
    })

    document.querySelector("#generate-container").innerHTML = HTMLStream;
}


async function onLoad(){

    // check local storage

    if(!localStorage.getItem('savedPrompts')){
        // fetch naar backend

        const promises = promtArray.map(async prompt => {
            const response = await postRequest({"prompt": prompt[1]});
            return response;
        });

        resultArray = await Promise.all(promises);

        console.log("INIT POST");
        renderButtons(promtArray);

        localStorage.setItem('savedPrompts', resultArray);

    }else{
        resultArray = localStorage.getItem('savedPrompts');
        console.log("INIT LOCAL STORAGE");
        renderButtons(promtArray);
    }

    // eventListeners

    document.querySelectorAll(".generate-button").forEach((button) => {
        button.addEventListener('click', async (e) => {
            const response = await postRequest({"prompt": promtArray[button.id[2]][1]});
            console.log(response);
            document.querySelector(`#p-${button.id[2]}`).innerHTML = response[0].text;

            // onstabiel

            let oldLocalStorage = localStorage.getItem('savedPrompts');
            oldLocalStorage[button.id[2]] = response[0].text;
            localStorage.setItem('savedPrompts', oldLocalStorage);
        });
    });

}




onLoad();