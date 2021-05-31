// Express

const express = require('express')
const app = express()

// Openai API

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

let compeletePrompt = () => {
    return ({
    text: 'View Full Version : Blu-ray on mac mini via HDMI?',
    index: 0,
    logprobs: null,
    finish_reason: 'stop'
  });
}

/*let compeletePrompt = async (prompt) => {
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

    //console.log(gptResponse.data.choices);

    return gptResponse.data.choices;
};*/



// Routes

app.use(express.static('frontend'));

app.post('/generate', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await compeletePrompt()));
});



app.listen(3000)
