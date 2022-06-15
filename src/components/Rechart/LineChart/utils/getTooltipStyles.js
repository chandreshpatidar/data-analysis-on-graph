export const getTooltipStyles = (barX, barY) => `
      transform: translate(${barX}px, ${barY}px);
      pointer-events: none;  position: absolute;
      top: -10px;
      left: -13px;
      opacity: 1;
      transition: all 400ms ease 0s;
    `;
