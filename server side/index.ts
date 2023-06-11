import express, { Express, Request, Response } from "express";
import wordsRoute from './routes/wordsRoute';
import cors from 'cors'

const port = 8000;

const app: Express = express();


app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/api/v1/words', wordsRoute)



app.get("/words", (req: Request, res: Response) => {
  res.json();
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});