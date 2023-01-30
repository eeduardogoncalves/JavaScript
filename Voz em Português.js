// 
by Eduardo Gonçalves
Consulte - https://www.youtube.com/channel/UCYl0lZjwjafsQyGQ_6xfiKw?sub_confirmation=1

//

(function() {

    "use strict";

    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var readline = require("readline");

    var audioFile = "pt-br-voz-antonio.wav";

    // Replace with your subscription key and region
    const speechConfig = sdk.SpeechConfig.fromSubscription("API_KEY_AZURE", "brazilsouth");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    // The language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = "pt-BR-AntonioNeural"; 

    // Create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Digite algum texto que você deseja falar >\n> ", function (text) {
      rl.close();
      // Start the synthesizer and wait for a result.
      synthesizer.speakTextAsync(text,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you set the speech resource key and region values?");
        }
        synthesizer.close();
        synthesizer = null;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = null;
      });
      console.log("Agora sintetizando para: " + audioFile);
    });
}());
