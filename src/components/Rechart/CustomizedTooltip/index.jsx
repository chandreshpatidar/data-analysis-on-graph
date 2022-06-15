import React from 'react';
import PropTypes from 'prop-types';
import birthData from '../../../mocks/birthData.json';

import './styles.css';

export const CustomizedTooltip = ({ label }) => {
  const tooltipData = birthData.find(
    (dataObj) => dataObj.shortMonthName === label
  );

  if (tooltipData) {
    return (
      <div className="tooltip-wrapper">
        <p className="tooltip-label">{tooltipData?.monthName}</p>
        <p className="tooltip-value">Total Birth: {tooltipData?.totalBirth}</p>
      </div>
    );
  }
};

CustomizedTooltip.defaultProps = {
  label: '',
};

CustomizedTooltip.propTypes = {
  label: PropTypes.string.isRequired,
};
