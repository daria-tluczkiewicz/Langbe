// // /**
// //  * First we will load all of this project's JavaScript dependencies which
// //  * includes React and other helpers. It's a great starting point while
// //  * building robust, powerful web applications using React + Laravel.
// //  */

// // require('./bootstrap');

// // /**
// //  * Next, we will create a fresh React component instance and attach it to
// //  * the page. Then, you may begin adding components to this application
// //  * or customize the JavaScript scaffolding to fit your unique needs.
// //  */

// import Index from './components/Index'

// // const { default: axios } = require('axios');

// // const card = document.querySelector('.app-card');
// // const cardMarker = document.querySelector('.app-card .marker');
// // const cardWord = document.querySelector('.app-card .word');
// // const cardFrequency = document.querySelector('.app-card .rank');
// // const cardWarning = document.querySelector('.app-card .warn');
// // const body = document.querySelector('body');
// // let mousedown = false;
// // let startY = 0;
// // let startX = 0;
// // let movedby = 0;
// // let xmovedby = 0;
// // let oldLevelColor = "";
// // let originallevelColor = "";
// // let markerSpan = document.querySelector('.app-card .marker span');
// // let learningHistory = [];
// // let currentWordIndex = -1;
// // let isLoggedIn;
// // let recentData = {};
// // let gameMode = 10000;
// // const sentenceContainer = document.getElementById('sentenceContainer');
// // const addSentence = document.getElementById('addSentence');
// // const sendSentenceButton = document.getElementById('sendSentenceButton');
// // const showTextFieldButton = document.getElementById('showTextFieldButton');
// // const originalWord = document.querySelector('.word-wrapper.original');
// // const translatedWord = document.querySelector('.word-wrapper.translation');

// // // const LEVEL_COLOR = {
// // //     A: 'blue',
// // //     B: 'green',
// // //     C: 'yellow',
// // //     D: 'red',
// // //     DEFAULT: 'gray'
// // // }

// // // const LEVEL_RELATION = {
// // //     A: 'Używam',
// // //     B: 'Znam',
// // //     C: 'Kojarzę',
// // //     D: 'Nie znam',
// // //     DEFAULT: 'Nieoznaczone'
// // // }

// // // const LEVEL_CODE = {
// // //     A: 'A',
// // //     B: 'B',
// // //     C: 'C',
// // //     D: 'D',
// // //     DEFAULT: '',
// // // }

// // // let levelColor = LEVEL_COLOR.DEFAULT;
// // // let levelText = LEVEL_CODE.DEFAULT

// // // body.addEventListener('mousedown', mouseDownHandler);
// // // body.addEventListener('touchstart', mouseDownHandler);

// // // body.addEventListener('mousemove', mouseMoveHandler);
// // // body.addEventListener('touchmove', mouseMoveHandler);

// // // body.addEventListener('mouseup', mouseUpHandler);
// // // body.addEventListener('touchend', mouseUpHandler);

// // // function mouseDownHandler(e) {
// // //     if (!body.classList.contains('word-list-open')){
// // //         if ( !mousedown ) {
// // //             startY = e.clientY ? e.clientY : e.touches[0].clientY
// // //             startX = e.clientY ? e.clientX : e.touches[0].clientX

// // //             mousedown = true;
// // //             body.classList.add('dragging');
// // //             originallevelColor = levelColor;
// // //         }
// // //     }
// // // }
// // // function mouseMoveHandler (event) {
// // //     if (!body.classList.contains('word-list-open')){
// // //         if ( mousedown ) {
// // //             let { clientX } = event.clientX ? event : event.touches[0];
// // //             let { clientY } = event.clientY ? event : event.touches[0];

// // //             movedby = -1 * (clientY - startY);
// // //             xmovedby =  clientX - startX;

// // //             oldLevelColor = levelColor;

// // //             if ( movedby <= 100 && movedby > 50 ) {
// // //                 levelColor = LEVEL_COLOR.D;
// // //                 levelText = LEVEL_RELATION.D;
// // //             } else if ( movedby <= 150 && movedby > 100 ) {
// // //                 levelColor = LEVEL_COLOR.C;
// // //                 levelText = LEVEL_RELATION.C;
// // //             } else if ( movedby <= 200 && movedby > 150 ) {
// // //                 levelColor = LEVEL_COLOR.B;
// // //                 levelText = LEVEL_RELATION.B;
// // //             } else if ( movedby <= 250 && movedby > 200 ) {
// // //                 levelColor = LEVEL_COLOR.A;
// // //                 levelText = LEVEL_RELATION.A;
// // //             }

// // //             if ( movedby < -100 ) {
// // //                 card.classList.add('show-reveal');
// // //             } else {
// // //                 card.classList.remove('show-reveal');
// // //             }

// // //             if ( xmovedby > 100 ) {
// // //                 card.classList.add('show-prev');

// // //             } else {
// // //                 card.classList.remove('show-prev');
// // //             }

// // //             if ( xmovedby < -100 ) {
// // //                 card.classList.add('show-next');

// // //             } else {
// // //                 card.classList.remove('show-next');
// // //             }

// // //             cardMarker.classList.remove(oldLevelColor);
// // //             cardMarker.classList.add(levelColor);
// // //             card.classList.remove(oldLevelColor + '-border');
// // //             card.classList.add(levelColor + '-border');
// // //             markerSpan.innerText = levelText;
// // //             if ( true ) {
// // //                 markerSpan.setAttribute('style', `transform: translateY(-${movedby/2}px)`)
// // //                 cardWord.setAttribute('style', `transform: translateY(${-movedby}px) translateX(${xmovedby}px)`)
// // //             }
// // //         }
// // //     }
// // // }

// // // const canMoveCard = () => (!body.classList.contains('word-list-open'));

// // // function mouseUpHandler (e) {
// // //     if (canMoveCard()){

// // //         mousedown = false;
// // //         markerSpan.removeAttribute('style');
// // //         cardWord.removeAttribute('style');
// // //         body.classList.remove('dragging');

// // //         if ( originallevelColor != levelColor || body.classList.contains('revealed') ) {
// // //             // # todo: update levelColor

// // //             // var level = "d";
// // //             // if ( levelColor == "yellow") {
// // //             //     level = "c";
// // //             // } else if ( levelColor == "green" ) {
// // //             //     level = "b";
// // //             // } else if ( levelColor == "blue" ) {
// // //             //     level = "a";
// // //             // }
// // //             const { word_id, state} = recentData;
// // //             learningHistory[currentWordIndex].level = state;
// // //             updateWordStatus(word_id, level);
// // //         }

// // //         // if has class show-next then next card .. and remove that class
// // //         if ( card.classList.contains('show-next') ) {
// // //             card.classList.add('loading');

// // //             showNext();

// // //             card.classList.remove('show-next');
// // //             card.classList.remove('show-reveal');
// // //         }

// // //         // if has class show-prev then prev card .. and remove that class
// // //         if ( card.classList.contains('show-prev') ) {
// // //             showPrev();

// // //             card.classList.remove('show-prev');
// // //             card.classList.remove('show-reveal');
// // //         }

// // //         // if has class show-reveal then reveal card .. and remove that class
// // //         if ( card.classList.contains('show-reveal') ) {
// // //             body.classList.add('revealed');
// // //             card.classList.remove('show-reveal');
// // //         }
// // //     }
// // // }

// // require('./bootstrap');

// // // todo: Always store array of previous words >>> MAYBE Local Storage
// // // todo: when moved back - keep track of the words ahead >>> Local Storage
// // // todo: when moved back but no history ? simply random

// // // Make a request for a user with a given ID

// // function updateLearningHistory (obj) {
// //     const {word, translation, level, word_id, audio, frequency, warning, sentence} = obj;

// //     learningHistory.push({//przeniesione na reduxa - chyba?
// //         word,
// //         translation,
// //         level,
// //         word_id,
// //         audio,
// //         frequency,
// //         warning,
// //         sentence
// //     });
// // }

// // axios.get('/word/' + gameMode)
// //     .then(function (response) {
// //         recentData = response.data;
// //         fillCard(recentData);
// //         updateLearningHistory(recentData);
// //         currentWordIndex = 0;
// //         card.classList.remove('loading');

// //     })
// //     .catch(function (error) {
// //         // handle error
// //         console.log(error);
// //     })
// //     .then(function () {
// //         // always executed
// //     });

// // function showNext () {
// //     hideAddSentenceContainer();

// //     if (currentWordIndex < learningHistory.length-1 ){
// //         currentWordIndex ++
// //         body.classList.remove('revealed');
// //         fillCard(learningHistory[currentWordIndex]);
// //         card.classList.remove('loading');

// //         } else {
// //         axios.get('/word/' + gameMode)
// //             .then(function (response) {
// //                 recentData = response.data
// //                 body.classList.remove('revealed');
// //                 fillCard(recentData);
// //                 card.classList.remove('loading');

// //                 updateLearningHistory(recentData);
// //                 currentWordIndex = learningHistory.length-1;

// //                 console.log({learningHistory}, {currentWordIndex})

// //             })
// //             .catch(function (error) {
// //                 console.log(error);
// //             });
// //     }
// // }

// // function showPrev () {
// //     hideAddSentenceContainer();

// //     currentWordIndex--;
// //     if (currentWordIndex < 0){
// //         console.log('mniej niz zero')
// //         return;
// //     } else {
// //         body.classList.remove('revealed');
// //         const {id, level} = learningHistory[currentWordIndex];
// //         if (level === false) {
// //             getWordStatus(id);
// //         }
// //         fillCard(learningHistory[currentWordIndex]);
// //     }

// // }

// // function fillCard (obj) {
// //     const { word, translation, level, frequency, warning, sentence } = obj

// //     originalWord.innerText = word;
// //     translatedWord.innerText = translation;
// //     oldLevelColor = levelColor;

// //     // if (sentence === null) {
// //     //     sentenceContainer.innerHTML = "";
// //     //     sentenceContainer.classList.remove('show');
// //     // } else {
// //     //     sentenceContainer.innerHTML = sentence;
// //     //     sentenceContainer.classList.add('show');
// //     //     showTextFieldButton.classList.add('show');
// //     // }

// //     if ( level == false) {
// //         levelColor = "gray";
// //         levelText = "Nieoznaczone";
// //     } else if ( level == "d") {
// //         levelColor = "red";
// //         levelText = "Nie znam";
// //     } else if ( level == "c" ) {
// //         levelColor = "yellow";
// //         levelText = "Kojarzę";
// //     } else if ( level == "b" ) {
// //         levelColor = "green";
// //         levelText = "Znam";
// //     } else if ( level == "a" ) {
// //         levelColor = "blue";
// //         levelText = "Używam";
// //     }

// //     if ( warning == 1 ) {
// //         cardWarning.classList.add('warned');
// //     } else {
// //         cardWarning.classList.remove('warned');
// //     }

// //     cardMarker.classList.remove(oldLevelColor);
// //     cardMarker.classList.add(levelColor);
// //     card.classList.remove(oldLevelColor + '-border');
// //     card.classList.add(levelColor + '-border');
// //     markerSpan.innerText = levelText;
// //     cardFrequency.innerText = frequency;
// // }

// // function updateWordStatus(id, level) {
// //   const url = `/status/${id}/${level}`;
// //   const requestData = { level };

// //   axios
// //     .put(url, requestData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //     .catch((error) => {
// //       console.error('Error:', error);
// //     });

// //     learningHistory[currentWordIndex].level = level;
// // }

// // async function getWordStatus (id) {

// //   const url = `https://langbe.online/status/${id}`;

// //   axios
// //     .get(url)
// //     .then((response) => {
// //       if (response.status === 200) {
// //         const data = response.data;
// //         if (data.level) {
// //             level = data.level;
// //             console.log(`Level for word ID ${id}: ${data.level}`);
// //             learningHistory[currentWordIndex].level = level;

// //           return level
// //         } else {
// //           console.log(`nie ma takiego id ${id}`);
// //         }
// //       } else {
// //         console.error('Failed to fetch data');
// //       }
// //     })
// //     .catch((error) => {
// //       console.error('Error:', error);
// //     });
// // }

// // function checkIfUserIsLoggedIn () {

// //     const url = `https://langbe.online/check-auth`;

// //     axios
// //     .get(url)
// //     .then((response) => {
// //         isLoggedIn = response.data.loggedIn;

// //         if (isLoggedIn) {
// //             const body = document.querySelector('body');
// //             body.classList.add('logged-in');
// //         }
// //     })
// //     .catch((error) => {
// //         console.error('Error:', error);
// //     }).finally(() => {
// //      body.classList.remove('not-logged-in');
// //     });

// // }

// // window.addEventListener('load', checkIfUserIsLoggedIn);

// // let stats = {};

// // function checkStats () {

// //     const url = `https://langbe.online/stats`;

// //     axios
// //     .get(url)
// //     .then((response) => {
// //         stats = response.data
// //         console.log(stats);
// //         fillStats();
// //     })
// //     .catch((error) => {
// //         console.error('Error:', error);
// //     });

// // }

// // function fillStats() {
// //     const statKeys = ['A', 'B', 'C', 'D'];

// //     statKeys.forEach(key => {
// //         const element = document.getElementById(`stats${key}`);
// //         element.innerHTML = stats[key.toLowerCase()];
// //     });
// // }

// // const statsIcon = document.getElementById('statsIcon')

// // function showStats() {
// //     if (!body.classList.contains('stats-open')){
// //         checkStats();
// //     }

// //     body.classList.remove('word-list-open');

// //     if(body.classList.contains('change-mode-open')){
// //         body.classList.remove('change-mode-open');
// //         setTimeout(()=>{
// //             body.classList.toggle('stats-open');
// //         },150);
// //     } else {
// //         body.classList.toggle('stats-open');
// //     }
// // }

// // statsIcon.addEventListener('click', showStats)

// // function makeWordList() {
// //     const wordList = document.getElementById('wordList');
// //     const wordItems = learningHistory.map((item) => {
// //         if (item.level == "d"){
// //             level = "red"
// //         } else if (item.level == "c"){
// //             level = "yellow"
// //         } else if (item.level == "b"){
// //             level = "green"
// //         } else if (item.level == "a"){
// //             level = "blue"
// //         } else {
// //             level = "gray"
// //         }
// //         return `
// //             <li class='word-container'>
// //                 <div class='word-list-level ${level}'></div>
// //                 <p class='word-list-word'>${item.word}</p>
// //                 <p class='word-list-translation'>${item.translation}</p>
// //             </li>
// //         `;
// //     });

// //     wordList.innerHTML = wordItems.join('');

// //     showWordList();
// // }

// // function showWordList() {
// //     body.classList.remove('stats-open')
// //     const wordList = document.getElementById('wordList');
// //     wordList.classList.toggle('hide');
// //     body.classList.toggle('word-list-open');
// //     body.classList.remove('change-mode-open');
// // }

// // const wordListIcon = document.getElementById('wordListIcon')

// // wordListIcon.addEventListener('click', makeWordList)

// // const modeIcon = document.getElementById('modeIcon')

// // modeIcon.addEventListener('click', changeMode)

// // function changeMode() {
// //     body.classList.remove('stats-open');
// //     setTimeout(()=>{
// //         body.classList.toggle('change-mode-open')
// //     },300);
// // }

// // const checkboxes = document.querySelectorAll('.change-mode-container input[type="radio"]');
// // const selectedLevel= document.getElementById('selectedLevel');

// // checkboxes.forEach((checkbox) => {
// //     checkbox.addEventListener('change', () => {
// //         if (checkbox.checked) {
// //             updateIconWithMode(checkbox.value);
// //         }
// //     });
// // });

// // function updateIconWithMode (mode) {
// //     convertLevelToWords(mode)
// //     selectedLevel.innerHTML = mode.toString()
// //     console.log('updated')
// // }

// // function convertLevelToWords(level){
// //     if (level == 1) {
// //         gameMode = 200
// //     } else if (level == 2) {
// //         gameMode = 500
// //     } else if (level == 3) {
// //         gameMode = 1000
// //     } else if (level == 4) {
// //         gameMode = 2000
// //     } else if (level == 5) {
// //         gameMode = 3000
// //     }
// // }

// // function playAudio() {
// //     const audioFile = learningHistory[currentWordIndex].audio.split('/');

// //     const path = `https://langbe.online/audio/${audioFile[audioFile.length-1]}`;

// //     const player = document.getElementById('player');

// //     // Remove any existing audio element
// //     const existingAudio = document.getElementById('audioTTS');
// //     if (existingAudio) {
// //         existingAudio.remove();
// //     }

// //     // Create a new audio element and add it to the player div
// //     const audioTTS = document.createElement('audio');
// //     audioTTS.id = 'audioTTS';
// //     audioTTS.src = path;
// //     audioTTS.innerHTML = `<a href="${path}">Download audio</a>`;
// //     player.appendChild(audioTTS);

// //     // Play the audio
// //     audioTTS.play();
// // }

// // const playButton = document.getElementById('playButton');

// // cardWord.addEventListener('click', playAudio);

// // cardWarning.addEventListener('click', async function () {

// //     const {word_id, warning} = learningHistory[currentWordIndex];

// //     learningHistory[currentWordIndex].warning = warning === 1 ? 0 : 1;

// //     await axios.get('/word/warning/' + word_id).then(function () {
// //         cardWarning.classList.toggle('warned');
// //     });
// // });

// // // function saveTextAreaValue() {
// // //     const addSentence = document.getElementById('addSentence');
// // //     const { word_id } = learningHistory[currentWordIndex]
// // //     let sentence = addSentence.value;
// // //     learningHistory[currentWordIndex].sentence = sentence;
// // //API CALL TO UPDATE SENTENCE
// //     // if (sentence) {
// //     //     const url = `/word/sentence/${word_id}`;
// //     //     axios.put(url, {sentence})
// //     //         .then((response) => {
// //     //             console.log('Sentence updated successfully', response.data);
// //     //         })
// //     //         .catch((error) => {
// //     //             console.error('Sentence not updated. ', error);
// //     //         });
// //     // }

// // // }

// // // showTextFieldButton.addEventListener('click', showAddSentenceContainer);

// // // sendSentenceButton.addEventListener('click', saveTextAreaValue);
// // // sendSentenceButton.addEventListener('click', hideAddSentenceContainer)

// // // function showAddSentenceContainer () {
// // //     addSentence.value="";
// // //     body.classList.add('text-field-active');
// // // }
// // // function hideAddSentenceContainer () {
// // //     body.classList.remove('text-field-active');
// // // }
