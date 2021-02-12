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

// identify the containers
const referenceBox = document.getElementById('reference-text');
const typingField = document.getElementById('typing-field');

referenceBox.innerHTML = sentence;

// helper function - check if word is correct
const checkWord = function(typed, reference, addSpace) {
  if (addSpace) {
    reference += ' ';
  }

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
  if (incompleteWords.length === 0) {
    console.log('last word!');
    const targetWord = checkWord(typedWord, reference, false);
  }
  const targetWord = checkWord(typedWord, reference, true);

  if (targetWord.passed) {
    typingField.value = '';
    if (incompleteWords.length === 0) {
      typingField.disabled = true;
      typingField.value = 'Done!';
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
typingField.addEventListener('keyup', checkProgress);