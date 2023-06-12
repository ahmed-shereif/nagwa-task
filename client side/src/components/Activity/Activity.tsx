import React, { FC, useEffect, useState } from 'react';
import styles from './Activity.module.css';
import { Words } from '../../interfaces/Words.interface';
import { partOfSpeach } from './partOfSpeech';
import { formState } from '../../enums/FormsState';
interface ActivityProps {
  words: Words[] | null;
  counter: number,
  setCounter: any,
  formStatus: formState,
  setFormStatus: any,
  score: number,
  setScore: any
}


const Activity: FC<ActivityProps> = (props: ActivityProps) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormStatus(formState.selected)
    setSelectedValue(event.target.value);

  };


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    props.setFormStatus(formState.submitted)
    event.preventDefault();
    if (props.words && props?.words[currentIndex]?.pos === selectedValue) {
      setScore(score + 1);
      setSelectedValue("")

    } else {
    }

  }

  function onNext() {
    props.setFormStatus(formState.intintial)
    setCurrentIndex(currentIndex + 1);
    props.setCounter(props.counter + 1);
    setSelectedValue("")
  }


  useEffect(() => {
    if (props.counter > 10) {
      props.setFormStatus(formState.finshed)
    }
  }, [props.counter])

  return (
    <div className={styles.Activity} >
      <div style={{ display: props.counter === 10 ? "none" : "block" }} >
        <div className='ml-auto  my-[40px] w-max  h-[120px] rounded-lg bg-black text-gray-200 text-4xl px-4 py-5 flex flex-col align-middle justify-center'>
          <div>
            score
          </div>

          <div className='text-center'>
            {score}
          </div>
        </div>
        <div className='questionBody text-center'>
          <span className="question text-3xl font-mono text-gray-600 ">{props.counter + "-"} Select the type of the word: </span>
          <span className="word text-5xl font-mono font-bold text-red-400">{props.words && props?.words[currentIndex]?.word}</span>
        </div>
        <form className="sm:w-full md:w-[80%] lg:w-[70%] flex flex-col mx-auto" onSubmit={handleSubmit}  >
          <div className="btn-container  items-center justify-around w-full flex my-[50px] md:my-[100px] flex-col md:flex-row ">
            {
              partOfSpeach.map((item) => {
                return (
                  <label key={item.id} className={selectedValue === item.value ? styles.checked : ""} >
                    <input
                      type="radio"
                      value={item.value}
                      checked={selectedValue === item.value}
                      onChange={handleOptionChange}
                      disabled={props.formStatus === formState.submitted || props.formStatus === formState.finshed}
                    />
                    {item.label}
                  </label>
                )
              })
            }
          </div>
          <div className='submit flex mx-auto w-1/4 items-center justify-around ' >
            <button className='px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200'
              disabled={props.formStatus === formState.intintial || props.formStatus === formState.submitted || props.formStatus === formState.finshed} type="submit">Submit</button>
            <button className='px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200'
              disabled={props.formStatus === formState.submitted ? false : true || props.formStatus === formState.finshed} onClick={onNext}>Next</button>
          </div>
        </form>
      </div >

    </div >

  )
}



export default Activity;