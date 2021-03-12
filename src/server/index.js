var path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const cors = require('cors');
const bodyParser = require('body-parser')
// node fetch module to fetch api from the server using dot env variable
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');
// node-fetch module

const app = express();
// setup dotenv environment
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

const PORT = process.env.PORT || 8081;

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port 8081!'.america)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.get('/api',(req,res) => {
    res.status(200).json({message:'online'})
})
 // api key variable
 const API_KEY = process.env.API_KEY;
 

// request and response source from meaning cloud
//https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response
//https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/request
// "https://api.meaningcloud.com/sentiment-2.1?key=<your_key>&lang=<lang>&txt=<text>&model=<model>"

// using URl request to analuze http website
// example : https://www.udacity.com/blog/2020/09/using-googles-nlp-tools.html

// post our data
app.post('/sentiment', async(req, res) => {
    try {
        const text = req.body.text;
        const API_URL = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&url=${text}&model=general`
        const response = await fetch(API_URL,{
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })  
        const data = await response.json()
       console.log(`responsed data from meaningcloud API: ${data}`.yellow)
        const responseData = {
            status:data.status,
            model:data.model,
            score_tag :data.score_tag,
            agreement:data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony,
            sentence_list: data.sentence_list,
            sentimented_entity_list: data.sentimented_entity_list,
            sentimented_concept_list: data.sentimented_concept_list
        }
        res.send(responseData)
    } catch (error) {
        console.log(`error ${error}`)
    }
})