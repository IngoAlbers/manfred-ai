angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope) {
  $scope.recognizedText = '';

  $scope.speakText = function() {
    TTS.speak({
      text: $scope.processInput($scope.recognizedText),
      locale: 'de-DE',
      rate: 1.5
    }, function() {
      // Do Something after success
    }, function(reason) {
      // Handle the error case
    });
  };

  $scope.processInput = function(text) {
    // 10% chance to gain sudden clarity
    if(Math.floor(Math.random() * 10 + 1) == 10) {
      return 'Ah ja ok!';
    }

    switch(text) {
      case 'hello':
        return 'Ja Hallo!';
      default:
        return 'Hä!';
    }
  };

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
