import { Request, Response } from 'express';
import data from '../data/TestData.json';

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
  data.scoresList.push(score)
  let scoreListLength: number = data.scoresList.length;
  let numberOfScoresUnderThisScore: number = 0;

  data.scoresList.map((scoreInList: number) => {
    if (scoreInList < score) {
      numberOfScoresUnderThisScore++
    }
  })

  let rank = (numberOfScoresUnderThisScore / scoreListLength) * 100

  return Math.round(rank);
}
