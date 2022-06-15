export const composedChartProps = {
  height: 400,
  width: 1000,
  margin: {
    top: 100,
    right: 10,
    left: 10,
    bottom: 10,
  },
};

export const xAxisProps = {
  dataKey: 'shortMonthName',
  stroke: 'cornflowerblue',
  strokeOpacity: 0.8,
  tickLine: false,
  scale: 'point',
};

export const yAxisProps = {
  stroke: 'cornflowerblue',
  strokeOpacity: 0.8,
};

export const barProps = {
  dataKey: 'totalBirth',
  stroke: 'cornflowerblue',
  fill: 'cornflowerblue',
  strokeOpacity: 0.7,
  barSize: 3,
};

export const lineProps = {
  type: 'monotone',
  dataKey: 'totalBirth',
  stroke: 'cornflowerblue',
  fill: 'cornflowerblue',
  dot: { r: 5 },
  activeDot: { r: 5, stroke: 'cornflowerblue', strokeOpacity: 0.7 },
  strokeOpacity: 0.7,
};

export const tooltipProps = {
  cursor: false,
  position: { x: 0, y: 0 },
};
