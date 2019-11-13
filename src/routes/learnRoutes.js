const express = require('express');
const db = require('../model/database.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const routes = express.Router();
const {Translate} = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({projectID});
  http://localhost:8080/learn/spanish/level/1/from/english
routes.route('/:target/level/:level/from/:native')
  // .get((req, res) => getSpeech(req,res));
 //routes.route('/')
.get((req, res) => getLearn(req,res));
  
async function getLearn(req, res){
  const native = req.params.native;
  const target = req.params.target;
  const level = req.params.level;
  const result =  await db.query("SELECT * FROM words where words.level = level ORDER BY RAND() LIMIT 0,5");
  let textArr = [];
  let sentenceArr = [];
  var resultset = {};
  let imageArr = [];
  
    for(i=0; i<result[0].length;i++)
    {
      text = result[0][i]['word'];
      sentence = result[0][i]['sentence'];
      image = result[0][i]['image'];
      id = result[0][i]['id'];
      console.log(id);
      
      // if(native!='english')
      // {
      //   const translationOriginal = translateText(text, sentence,native);
      //   text = translationOriginal['text'];
      //   sentence = translationOriginal['sentence'];
      // };
      console.log(text);
      // const translated = translateText(text, sentence, target);
      // getSpeech(translated['text'], target, 'targetText'+i.toString());
      // getSpeech(translated['sentence'], target, 'targetSentence'+i.toString());
      getSpeech(text, target, 'targetText'+id.toString(),id );
      getSpeech(sentence, target, 'targetSentence'+id.toString(), id);

      // var resultset = [nativeText, nativeSentence, translated['text'], translated['sentence']];
      // textArr.push([text, translated['text']]);
      // sentenceArr.push([sentence, translated['sentence']]);
      textArr.push([text]);
      sentenceArr.push([sentence]);
      imageArr.push(image);
      
      // console.log(resultset);
      // res.render('learn', {resultset:resultset});

    };
    resultset = {'text':textArr, 'sentence':sentenceArr, 'image': image};
    console.log(resultset);
    res.render('learn', {resultset:resultset});

  async function translateText(text,sentence,target) {
    target = lang_dict_text[target];
    // console.log(text);
    const [word_translation] = await translate.translate(text, target);
    console.log(`Word Translation: ${word_translation}`);
    const [sent_translation] = await translate.translate(sentence, target);
    console.log(`Sentence Translation: ${sent_translation}`);
    // return {word_translation, sent_translation}
  };

  async function getSpeech(text, language, textType, id){
    // check if mp3 file for word/sentence already exists
    if (fs.existsSync('./public/audio/'+ id + textType+'_'+lang_dict_speech[language]+'.mp3')) {
      console.log('file alreday exists')
      // return id+textType+'_'+lang_dict_speech[language];
    }
    else{
      const client = new textToSpeech.TextToSpeechClient();
      const request = {
        input: {text: text},
        // Select the language and SSML Voice Gender (optional)
        voice: {languageCode: lang_dict_speech[language], ssmlGender: 'NEUTRAL'},
        // Select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
      const [response] = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      var filename = './public/audio/'+textType+'_'+lang_dict_speech[language]+'.mp3';
      // await writeFile('../../public/audio/'.concat(filename), response.audioContent, 'binary');
      await writeFile(filename, response.audioContent, 'binary');

      console.log('Audio content written to file');
      // return id+textType+'_'+lang_dict_speech[language];
    };
    

  };
};

module.exports = routes;
