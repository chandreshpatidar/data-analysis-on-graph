import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line, XAxis, YAxis, Tooltip, Bar, ComposedChart } from 'recharts';

import { CustomizedTooltip } from '../CustomizedTooltip';
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
  useEffect(() => {
    // Run after graph has been loaded.
    const timeout = setTimeout(() => {
      const bars = document.querySelectorAll('.recharts-rectangle');

      if (bars?.length) {
        bars.forEach((bar, index) => {
          bar.id = chartData[index].shortMonthName;
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMoveOverChart = (event) => {
    if (event.isTooltipActive) {
      // Get bar element by DOM API
      const bar = document?.getElementById(event.activeLabel);
      if (!bar) return;

      const barX = bar.getBoundingClientRect().x;
      const barY = bar.getBoundingClientRect().y;

      // Get tooltip element by DOM API
      const tooltip = document.querySelector('.recharts-tooltip-wrapper');
      if (!tooltip) return;

      const tooltipHeight = tooltip.getBoundingClientRect().height;

      // Get bar element's container by DOM API
      const barElementPosition = document
        .getElementsByClassName('recharts-bar')[0]
        .getBoundingClientRect();

      // Rewrite tooltip styles
      tooltip.style = getTooltipStyles(
        barX - barElementPosition.x,
        barY - tooltipHeight
      );
    }
  };

  return (
    <ComposedChart
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
