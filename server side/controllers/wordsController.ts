import { Request, Response } from 'express';
import data from '../data/TestData.json';
import { Words } from '../interfaces/words';



export function getWords(req: Request, res: Response): void {
  res.json(rondomSelectionWordList());
}


function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// get all pos types
let allPosTypes: string[] = []
data.wordList.map((word: Words) => {
  if (!allPosTypes.includes(word.pos)) {
    allPosTypes.push(word.pos)
  }
});

function rondomSelectionWordList(): Words[] {
  let wordList: Words[] = [];
  let newWordsArray: Words[] = [...shuffleArray(data.wordList)];

  // first add 1 of every type then remove the added object from array
  allPosTypes.map((pos: string) => {
    for (let i = 0; i < newWordsArray.length; i++) {
      if (newWordsArray[i].pos === pos) {
        wordList.push(newWordsArray[i])
        newWordsArray.splice(i, 1)
        return;
      }
    }
  })

  for (let i = 0; i < 10 - allPosTypes.length; i++) {
    let randomNumber = Math.floor(Math.random() * newWordsArray.length);
    wordList.push(newWordsArray[randomNumber])
    newWordsArray.splice(randomNumber, 1)
  }

  // shuffle the array again to make sure every thing is random
  return shuffleArray(wordList);
}




