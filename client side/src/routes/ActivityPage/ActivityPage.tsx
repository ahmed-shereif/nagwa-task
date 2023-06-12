
"use client";
import React, { FunctionComponent, useEffect } from 'react';
import styles from './ActivityPage.module.css';
import axios from 'axios';
import { useState } from "react";
import Activity from '../../components/Activity/Activity';
import { Words } from '../../interfaces/Words.interface';
import { formState } from '../../enums/FormsState';

interface ActivityProps { }

const ActivityPage: FunctionComponent<ActivityProps> = () => {

  const [words, setWords] = useState<Words[] | null>([]);
  const [counter, setCounter] = useState<number>(1);
  const [formStatus, setFormStatus] = useState<formState>(formState.intintial);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/words")
      .then((response) => {
        setWords(response.data.data.words);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });


  }, []);


  return (
    <div className={styles.ActivityPage} >
      <Activity
        words={words}
        counter={counter}
        setCounter={setCounter}
        setFormStatus={setFormStatus}
        formStatus={formStatus}
        score={score} setScore={setScore
        } />

      <div className='my-[100px] w-full flex justify-center align-middle content-center' style={{ display: counter === 10 ? "block" : "none" }}>

        <p className="question text-3xl font-mono text-gray-600 text-center ">Your final score is </p>
        <div className=' flex justify-center  mt-[50px]'>

          <button className='block text-center px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200'
            onClick={() => setFormStatus(formState.intintial)}>Tray Again</button>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;