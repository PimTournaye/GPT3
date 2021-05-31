const OpenAI = require('openai-api');
const dotenv = require('dotenv').config({
    path: __dirname + '/.env'
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);
const coordsPrestatyn = [53.335400, -3.406320];
const coordsLlandudno = [53.326542, -3.834460];
const coordsLlanfairfechan = [53.253899, -3.978390];


// MAP

let map = L.map('map').setView(coords, 13);

let marker1 = L.marker(coordsPrestatyn).addTo(map);
marker1.bindPopup("<b>Here is our start</b><br> What stories will you hear today.");

let marker2 = L.marker(coordsLlandudno).addTo(map);
marker2.bindPopup("<b>This is the midway point.</b><br> Exciting!");

let marker3 = L.marker(coordsLlanfairfechan).addTo(map);
marker3.bindPopup("<b>This is the end!</b><br> Time to go back home.");

// Text prompts

//const prompt = "Small intriguing stories about places you pass by on bike rides, like the Wales Coast Path. The first location is Prestatyn. The second location is Llandudno. The final location is Llanfairfechan. 1. Our story begins at Prestatyn, a seaside town with a dark, historical secret "
const promptPrestatyn = "Tell me a curious story about the coast of Prestatyn. Something to keep me entertained while I continue my bike ride."
const promptLlandudno = "We've arrived at Llandudno! What can you tell me about this place? Anything special?";
const promptLlanfairfechan = "And our trip is done. We ended up in Llanfairfechan. Any history or stories to wrap this trip up?";


let compeletePrompt = async (prompt) => { //
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 300, //OpenAI tokens are weird and expensive. Be careful.
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });
    console.log(gptResponse.data.choices);
};