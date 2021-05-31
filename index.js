const OpenAI = require('openai-api');
const dotenv = require('dotenv').config({
    path: __dirname + '/.env'
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

//const prompt = "Small intriguing stories about places you pass by on bike rides, like the Wales Coast Path. The first location is Prestatyn. The second location is Llandudno. The final location is Llanfairfechan. 1. Our story begins at Prestatyn, a seaside town with a dark, historical secret "



let compeletePrompt = async (prompt) => {
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 300,
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

compeletePrompt();