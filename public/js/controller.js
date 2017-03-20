var app = angular.module('Speechrecognition', 
	['ngResource', 'ngMaterial', 'ngAnimate',
    'ngAria', 'ngMessages', 'ui.router'
])

.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('brown');
    })
   .controller("speech", function ($scope, $http) {

        function getans(text) {
            $http.post("/api/getanswer", {
                    question: text
                })
                .
            then(function (response) {
                talkreply(response.data.resp);
            }, function (e) {
                alert(e);
            });
        }

        var recognition;

        $scope.startRecognition = function () {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = function (event) {};

            recognition.onresult = function (event) {
                if (recognition) {
                    recognition.onend = null;
                }

                var text = "";
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    text += event.results[i][0].transcript;
                }
                getans(text);
                stopRecognition();
            };
            recognition.onend = function () {
                stopRecognition();
            };
            recognition.lang = "en-US";
            recognition.start();
        };


        $scope.stopRecognition = function () {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
        };

        function talkreply(txt) {
            var su = new SpeechSynthesisUtterance();
            su.lang = "en";
            su.text = txt;
            speechSynthesis.speak(su);
        }
    });
