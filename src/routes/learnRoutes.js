const express = require('express');
const db = require('../model/database.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');




const routes = express.Router();

  // http://localhost:8080/learn/spanish/level/1/from/english
  routes.route('/:target/level/:level/from/:native')
  .get((req, res) => getSpeech(req,res));

  
  async function getLearn(req, res){
    const target = req.params.target;
    const level = req.params.level;
    const native = req.params.native;
    
    // add level
    // const [words, fields] = await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");

    // translate
    var results = [];

    res.render('learn', {results: results});
  }

  async function getSpeech(req, res){
    const target = req.params.target;
    const native = req.params.native;
    const client = new textToSpeech.TextToSpeechClient();
    const text = 'Hello, world!';
    const word = 'Hello';
    // console.log(word)
    const request = {
      input: {text: text},
      // Select the language and SSML Voice Gender (optional)
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
      // Select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');  

    res.render('learn', {results: word});
  };


  


module.exports = routes;