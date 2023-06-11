
"use client";
import React, { FunctionComponent, useEffect } from 'react';
import styles from './ActivityPage.module.css';
import axios from 'axios';
import { useState } from "react";
import Activity from '../../components/Activity/Activity';

interface ActivityProps { }

const ActivityPage: FunctionComponent<ActivityProps> = () => {

  const [words, setWords] = useState([]);

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
      Activitypage Component
      <Activity />
    </div>
  );
}

export default ActivityPage;