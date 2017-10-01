// Refactor this as best as you can.

fs = require('fs');
// songs
imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
tooManyCooks = ['c', 'g', 'f'];
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
            'em7', 'a7', 'f7', 'b'];
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
         'g7'];
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
song_11 = [];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

//replaced for loop with forEach//
// Use +=1 in last if statement //
function train(chords, label){
  songs.push([label, chords]);
  labels.push(label);
  chords.forEach(function(chord){
    if(!allChords.includes(chord)){
      allChords.push(chord);
    }
  })
  if(Object.keys(labelCounts).includes(label)){
    labelCounts[label] += 1;
  } else {
    labelCounts[label] = 1;
  }
};

//Unnecessary to write function just for songs.length. Plug in songs.length for numberOfSongs /
function setLabelProbabilities(){
  Object.keys(labelCounts).forEach(function(label){
    labelProbabilities[label] = labelCounts[label] / songs.length;
  });
};

//replace "i" with "song" and "j" with chord for easier readability//
//Also use += 1 when setting chord count in if statement
function setChordCountsInLabels(){
  songs.forEach(function(song){
    if(chordCountsInLabels[song[0]] === undefined){
      chordCountsInLabels[song[0]] = {};
    }
    song[1].forEach(function(chord){
      if(chordCountsInLabels[song[0]][chord] > 0){
        chordCountsInLabels[song[0]][chord] += 1;
      } else {
        chordCountsInLabels[song[0]][chord] = 1;
      }
    });
  });
}

//Replace "i" and "j". Also can use /= at the end to clean up code
function setProbabilityOfChordsInLabels(){
  probabilityOfChordsInLabels = chordCountsInLabels;
  Object.keys(probabilityOfChordsInLabels).forEach(function(count){
    Object.keys(probabilityOfChordsInLabels[count]).forEach(function(chord){
      probabilityOfChordsInLabels[count][chord] /= songs.length;
    });
  });
}

train(imagine, 'easy');
train(somewhere_over_the_rainbow, 'easy');
train(tooManyCooks, 'easy');
train(iWillFollowYouIntoTheDark, 'medium');
train(babyOneMoreTime, 'medium');
train(creep, 'medium');
train(paperBag, 'hard');
train(toxic, 'hard');
train(bulletproof, 'hard');

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();


//Remove unnecessary var ttal//
//Change last if statement to only check true values; the check for undefined does not do anything//
function classify(chords){
  console.log(labelProbabilities);
  var classified = {};
  Object.keys(labelProbabilities).forEach(function(probability){
    var first = labelProbabilities[probability] + 1.01;
    chords.forEach(function(chord){
      var probabilityOfChordInLabel = probabilityOfChordsInLabels[probability][chord];
      if(probabilityOfChordInLabel){
        first = first * (probabilityOfChordInLabel + 1.01);
      }
    });
    classified[probability] = first;
  });
  console.log(classified);
};

classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
