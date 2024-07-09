import React from 'react';
import styles from '../Basket/basket.module.scss';

const ProgressBar = ({ percentage, time }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${percentage}%` }}>
        <div className={styles.timeBubble} style={{ left: `${percentage}%` }}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;