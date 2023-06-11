import React, { FC } from 'react';
import styles from './Activity.module.css';

interface ActivityProps { }

const Activity: FC<ActivityProps> = () => (
  <div className={styles.Activity}>
    Activity Component
  </div>
);

export default Activity;