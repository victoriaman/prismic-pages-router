const Bargraph = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
    <path
      stroke="#0891B2"
      strokeLinecap="round"
      strokeWidth="5"
      d="M73 73H7"
    ></path>
    <path
      stroke="#0891B2"
      strokeOpacity="0.5"
      strokeWidth="5"
      d="M70 73V48c0-2-2-5-5-5H55c-3 0-5 3-5 5v25"
    ></path>
    <path
      stroke="#0891B2"
      strokeWidth="5"
      d="M50 73V17l-1-9-9-1-9 1-1 9v56"
    ></path>
    <path
      stroke="#0891B2"
      strokeOpacity="0.5"
      strokeWidth="5"
      d="M30 73V32c0-3-2-5-5-5H15c-3 0-5 2-5 5v41"
    ></path>
  </svg>
);

export default Bargraph;
