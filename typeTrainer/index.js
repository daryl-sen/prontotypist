console.log('index loaded');  
const sentence = 'The quick brown fox jumps over the lazy dog.';
const refSentenceArr = sentence.split(' ');

// cursor tracks which word is being typed
let cursor = 0;
let currentWord = refSentenceArr[cursor];

// initial condition
let completeWords = [];
let incompleteWords = [];
for (let i = 1; i < refSentenceArr.length; i++) {
  incompleteWords.push(refSentenceArr[i]);
}

console.log(incompleteWords);

// identify the containers
const referenceBox = document.getElementById('reference-text');
const typingField = document.getElementById('typing-field');

// helper function - check if word is correct
const checkWord = function(typed, reference) {
  // add a space to both
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

  return {passed: false, result: output};
};


// runs on key up of the typing box
const checkProgress = function() {
  const typedWord = typingField.value;
  const reference = refSentenceArr[cursor];
  const targetWord = checkWord(typedWord, reference);

  if (targetWord.passed) {
    completeWords.push(refSentenceArr[cursor]);
    incompleteWords.splice(0, 1); // remove the first word
    cursor++;
    typingField.value = '';
    referenceBox.innerHTML = 
      `<span class="complete">${completeWords.join(' ')}</span>` +
      ` ${refSentenceArr[cursor]} ` +
      `<span class="complete">${incompleteWords.join(' ')}</span>`;
  } else {
    referenceBox.innerHTML = 
      `<span class="complete">${completeWords.join(' ')}</span>` +
      ` ${targetWord.result} ` +
      `<span class="complete">${incompleteWords.join(' ')}</span>`;
  }
  

  
};