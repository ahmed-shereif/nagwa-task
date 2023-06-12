import express, { Express, Request, Response } from "express";
import wordsRoute from './routes/wordsRoute';
import cors from 'cors'
import rankRoute from './routes/rankRoute';
import bodyParser from "body-parser";
const port = 8000;

const app: Express = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/api/v1/words', wordsRoute)
app.use('/api/v1/rank', rankRoute)




app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});