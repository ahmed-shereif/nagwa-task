import { Request, Response } from 'express';
import data from '../data/TestData.json';


let scoresList = data.scoresList;
export function postRank(req: Request, res: Response): void {
  try {
    res.status(201).json({
      status: 'success',
      data: {
        rank: calculateRank(req.body?.score),
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data',
    });
  }
}

function calculateRank(score: number) {
  scoresList.push(score)
  let scoreListLength: number = scoresList.length;
  let numberOfScoresUnderThisScore: number = 0;

  scoresList.map((scoreInList: number) => {
    if (scoreInList < score) {
      numberOfScoresUnderThisScore++
    }
  })
  let rank = (numberOfScoresUnderThisScore / scoreListLength) * 100
  return Math.round(rank);
}
