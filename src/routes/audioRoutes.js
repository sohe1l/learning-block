const express = require('express');
const db = require('../model/database.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const routes = express.Router();
const { Translate } = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({ projectID });
http://localhost:8080/audio/Hello/1/English


routes.route('/:text/:id/:target')
    .get((req, res) => getLearn(req, res));

async function getLearn(req, res) {
    var type = req.params.type;
    var text = req.params.text;
    var target = req.params.target;
    const id = req.params.id;
    console.log(text);
    const rawfilename = target + text.replace(/ /g, '_') + id;
    const filename = './public/audio/'.concat(rawfilename, '.mp3');
    
    // check if file exists
    if (fs.existsSync(filename)) {
        console.log('file exists');
        const content = fs.readFileSync(filename);
        res.setHeader('Content-Type','"audio/mpeg"');
        res.send(content);
        return;
    }



    // const [result, _] = await db.query("SELECT * FROM words where id = ?", [id]);
    // const text = (type === 'word') ? result[0]['word'] : result[0]['sentence'];

    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: { text: text },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: lang_dict_speech[target], ssmlGender: 'NEUTRAL' },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    const sessionname = req.sessionID;
    await writeFile(filename, response.audioContent, 'binary');
    res.setHeader('Content-Type','"audio/mpeg"');
    res.send(response.audioContent);
    return;
};

module.exports = routes;
