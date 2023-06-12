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
  setScore: any,
  currentIndex: number,
  setCurrentIndex: any
}


const Activity: FC<ActivityProps> = (props: ActivityProps) => {

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);



  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormStatus(formState.selected)
    setSelectedValue(event.target.value);

  };


  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    props.setFormStatus(formState.submitted)
    event.preventDefault();
    if (props.words && props?.words[props.currentIndex]?.pos === selectedValue) {
      props.setScore(props.score + 1);
      setIsRightAnswer(true)
      setSelectedValue("")

    } else {
      setIsRightAnswer(false)
      setSelectedValue("")

    }

  }

  function onNext(): void {
    props.setFormStatus(formState.intintial)
    props.setCurrentIndex(props.currentIndex + 1);
    props.setCounter(props.counter + 1);
    setSelectedValue("")
  }


  useEffect(() => {
    console.log('👨‍🎨', props.counter)
    console.log('🧚', props.formStatus)

  }, [props, props.counter])

  function ShowRank(): void {
    console.log('🤒',)
    props.setFormStatus(formState.finshed)
  }
  return (
    <div className={styles.Activity} >
      <div style={{ display: props.formStatus === formState.finshed ? "none" : "block" }} >

        <div className='flex flex-col flex-wrap justify-center content-center w-[200px] md:mx-0 mx-auto '>
          {/* score */}
          <div className='text-center  my-[40px]  h-[120px] rounded-lg bg-black text-gray-200 text-4xl px-4 py-5 flex flex-col align-middle justify-center'>
            <div>
              score
            </div>

            <div className='text-center'>
              {props.score}
            </div>

          </div>

          {/* progress bar */}
          <div className=''>
            <div className='font-bold   text-gray-600' >Answered Questions</div>
            <progress id="progress " value={props.currentIndex} max="9">  </progress>

          </div>

        </div>

        {/* question */}
        {
          props.counter < 11 &&
          <div className='questionBody text-center'>
            <span className="question text-3xl font-mono text-gray-600 ">{props.counter + "-"} Select the type of the word: </span>
            <span className="word text-5xl font-mono font-bold text-red-400">{props.words && props?.words[props.currentIndex]?.word}</span>
            {/* question check */}
            <div className='text-2xl text-blue-500 mt-10 h-10' >
              <p style={{ display: props.formStatus === formState.submitted ? "block" : "none" }}> Your answer is <span className='text-green-500'>{isRightAnswer ? "right" : "wrong"}</span></p>

            </div>
          </div>
        }

        <form className="sm:w-full md:w-[80%] lg:w-[40%] flex flex-col mx-auto" onSubmit={handleSubmit}  >
          {
            props.counter < 11 &&
            <div className="btn-container  items-center justify-around w-full flex my-[50px] md:my-[70px] flex-col md:flex-row ">
              {
                partOfSpeach.map((item) => {
                  return (
                    <label key={item.id} className={selectedValue === item.value ? styles.checked : ""}  >
                      <input
                        type="radio"
                        value={item.value}
                        checked={selectedValue === item.value}
                        onChange={handleOptionChange}
                        disabled={props.formStatus === formState.submitted || props.counter > 10}
                      />
                      {item.label}
                    </label>
                  )
                })
              }
            </div>}

          {
            props.counter > 10 ?

              <div className='submit flex mx-auto w-1/2 items-center justify-around '>
                <button className='px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200' type='button' onClick={ShowRank}>
                  Show Rank
                </button>
              </div>
              :
              <div className='submit flex mx-auto w-1/2 items-center justify-around '  >
                <button className='px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200'
                  disabled={props.formStatus === formState.intintial || props.formStatus === formState.submitted} type="submit">Submit</button>
                <button className='px-6 py-3 hover:bg-slate-700 round bg-slate-900 text-gray-200'
                  disabled={props.formStatus === formState.submitted ? false : true || props.formStatus === formState.finshed} onClick={onNext}>Next</button>
              </div>


          }

        </form>
      </div >

    </div >

  )
}



export default Activity;