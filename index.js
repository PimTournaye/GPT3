// Express

const express = require('express')
const app = express()
const cors = require('cors');
const bodyparser = require('body-parser');


// Openai API

const OpenAI = require('openai-api');
const dotenv = require('dotenv').config({
    path: __dirname + '/.env'
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);


/*let compeletePrompt = () => {
    return ({
    text: 'View Full Version : Blu-ray on mac mini via HDMI?',
    index: 0,
    logprobs: null,
    finish_reason: 'stop'
  });
}*/

let compeletePrompt = async (prompt) => {
    const gptResponse = await openai.complete({
        engine: 'instruct-davinci',
        prompt: prompt,
        maxTokens: 110, //OpenAI tokens are weird and expensive. Be careful.
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

    return gptResponse.data.choices;
};



// Routes

app.use(express.json());
app.use(cors());

app.use(express.static('frontend'));

app.post('/generate', async (req, res) => {
    console.log("getting a post");
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await compeletePrompt(req.body.prompt)));
});



app.listen(3000)
