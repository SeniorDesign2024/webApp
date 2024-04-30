import React from "react";

/**
 * Component for displaying founders' names
 * @return {JSX.Element} JSX element representing the founders' names
 */
const FoundersList = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Founders</h2>
      <ul>
        <li>Cody Blankenship</li>
        <li>Shivam Mistry</li>
        <li>Ankit Mistry</li>
        <li>Saish Malluri</li>
      </ul>
    </div>
  );
};

export default FoundersList;
