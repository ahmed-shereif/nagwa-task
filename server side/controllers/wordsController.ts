import { Request, Response } from 'express';
import data from '../data/TestData.json';



console.log('👩‍🦲', data)
export function getWords(req: Request, res: Response): any {
  res.json();
}

