import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line, XAxis, YAxis, Tooltip, Bar, ComposedChart } from 'recharts';

import { CustomizedTooltip } from '../CustomizedTooltip';
import { Loader } from '../../Loader';
import {
  barProps,
  composedChartProps,
  lineProps,
  tooltipProps,
  xAxisProps,
  yAxisProps,
} from './componentDefaultProps';
import { getTooltipStyles } from './utils/getTooltipStyles';

export const LineChart = ({ chartData }) => {
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    // Run after graph has been loaded.
    const timeout = setTimeout(() => {
      const lineDots = document.querySelectorAll('.recharts-line-dot');

      if (lineDots?.length) {
        lineDots.forEach((lineDot, index) => {
          lineDot.id = chartData[index].shortMonthName;
        });
        setIsLoadedData(true);
      } else {
        alert('Something went wrong!');
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMoveOverChart = (event) => {
    if (event.isTooltipActive) {
      // Get line dot element by DOM API
      const lineDot = document?.getElementById(event.activeLabel);
      if (!lineDot) return;

      const lineDotX = lineDot.getBoundingClientRect().x;
      const lineDotY = lineDot.getBoundingClientRect().y;

      // Get tooltip element by DOM API
      const tooltip = document.querySelector('.recharts-tooltip-wrapper');
      if (!tooltip) return;

      const tooltipHeight = tooltip.getBoundingClientRect().height;

      // Get line dot element's container by DOM API
      const lineDotElementPosition = document
        .getElementsByClassName('recharts-bar')[0]
        .getBoundingClientRect();

      // Rewrite tooltip styles
      tooltip.style = getTooltipStyles(
        lineDotX - lineDotElementPosition.x,
        lineDotY - tooltipHeight
      );
    }
  };

  return (
    <>
      <ComposedChart
        style={{ visibility: isLoadedData ? 'visible' : 'hidden' }}
        {...composedChartProps}
        data={chartData}
        onMouseMove={handleMouseMoveOverChart}
      >
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <Bar {...barProps} />
        <Line {...lineProps} />
        <Tooltip {...tooltipProps} content={<CustomizedTooltip />} />
      </ComposedChart>

      {!isLoadedData && <Loader />}

      {isLoadedData && <p>Birth Graphical Representation in year 2000</p>}
    </>
  );
};

LineChart.defaultProps = {
  chartData: [],
};

LineChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      monthName: PropTypes.string.isRequired,
      shortMonthName: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      totalBirth: PropTypes.number.isRequired,
    })
  ).isRequired,
};
