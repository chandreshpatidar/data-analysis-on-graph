import React from 'react';
import { LineChart } from '../../components/Rechart/LineChart';
import birthData from '../../mocks/birthData.json';

import './styles.css';

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="birth-graph-container">
        <LineChart chartData={birthData} />
      </div>
    </div>
  );
};
