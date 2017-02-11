angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope) {
  $scope.recognizedText = '';

  $scope.speakText = function() {
    switch($scope.recognizedText) {
      case 'hello':
        text = 'Ja Hallo!';
        break;
      default:
        text = 'Hä!';
    }

    // Gain sudden clarity
    if(Math.floor(Math.random() * 10 + 1) == 10) {
      text = 'Ah ja ok!';
    }

    TTS.speak({
      text: text,
      locale: 'de-DE',
      rate: 1.5
    }, function() {
      // Do Something after success
    }, function(reason) {
      // Handle the error case
    });
  }

  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        $scope.recognizedText = event.results[0][0].transcript;
        $scope.$apply()
        $scope.speakText();
      }
    };
    recognition.start();
  };
});
