// create an array of the words in the sentence
let refSentenceArr = sentence.split(' ');
// add spaces to each word except the last word
refSentenceArr = refSentenceArr.map((word) => {
  if (word !== refSentenceArr[refSentenceArr.length - 1]) {
    return word += ' ';
  } else {
    return word;
  }
});

// cursor tracks which word is being typed
let cursor = 0;
let currentWord = refSentenceArr[cursor];

// initial condition
let completeWords = [];
let incompleteWords = [];
for (let i = 1; i < refSentenceArr.length; i++) {
  incompleteWords.push(refSentenceArr[i]);
}

// identify the containers
const referenceBox = document.getElementById('reference-text');
const typingField = document.getElementById('typing-field');

referenceBox.innerHTML = sentence;

// helper function - check if word is correct
const checkWord = function(typed, reference) {
  let output = '';

  // check for passing condition, terminate early if possible
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

const renderSuccess = function() {
  referenceBox.innerHTML = sentence;
  typingField.disabled = true;
  typingField.value = 'Done!';
};


// runs on key up of the typing box
const checkProgress = function() {
  const typedWord = typingField.value;
  const reference = refSentenceArr[cursor];
  const targetWord = checkWord(typedWord, reference);

  if (targetWord.passed) {
    typingField.value = '';
    if (incompleteWords.length === 0) {
      renderSuccess();
      return;
    }
    completeWords.push(refSentenceArr[cursor]);
    incompleteWords.splice(0, 1); // remove the first word
    cursor++;
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

// add keyup event listener to the typing field
// typingField.addEventListener('change', checkProgress);
typingField.addEventListener('keyup', checkProgress);
typingField.addEventListener('keypress', checkProgress);