export const checkeredBackground = /*css*/ `
  background-color: #ffffff;
  background-image: linear-gradient(
      45deg,
      rgb(153, 153, 153) 25%,
      transparent 25%
    ),
    linear-gradient(45deg, transparent 75%, rgb(153, 153, 153) 75%),
    linear-gradient(45deg, transparent 75%, rgb(153, 153, 153) 75%),
    linear-gradient(45deg, rgb(153, 153, 153) 25%, rgb(255, 255, 255) 25%);
  background-size: 1rem 1rem;
  background-position: 0 0, 0 0, -0.5rem -0.5rem, 0.5rem 0.5rem;
  position: absolute;
  top: 0px;
  z-index: -1;
  box-shadow: none;
  width: 100%;
  height: 100%;
  opacity: 1;
`;
