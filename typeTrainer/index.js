const sentence = 'This is my sentence.';
const refSentenceArr = sentence.split(' ');

// cursor tracks which word is being typed
let cursor = 0;
let currentWord = refSentenceArr[cursor];

// initial condition
let completeWords = [];
let incompleteWords = [];
for (const word of refSentenceArr) {
  incompleteWords.push(word);
}


// helper function - check if word is correct
const checkWord = function(typed, reference) {
  // add a space to both
  typed += ' ';
  reference += ' ';

  let output = '';

  // check for passed condition, terminate early if possible
  if (typed === reference) {
    output = `<span class="correct">${reference} </span>`;
    return {passed: true, result: output};
  }

  // check to see if each letter is correct and return it in a specific color
  for (let i = 0; i < reference.length; i++) {
    if (typed[i] === reference[i]) {
      output += `<span class="correct">${reference[i]}</span>`;
    } else {
      output += `<span class="incorrect">${reference[i]}</span>`;
    }
  }

  return {passed: true, result: output};
};


// runs on key up of the typing box
const checkProgress = function(typedEntry) => {
  const typedWord = document.getElementById('typing-field');
  const reference = refSentenceArr[cursor];
  const targetWord = checkWord();
  
};