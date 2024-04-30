import React from "react";

/**
 * Component for displaying key features
 * @return {JSX.Element} JSX element representing the key features
 */
const FeaturesList = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Key Features</h2>
      <ul>
        <li>Accurate attendance counting</li>
        <li>Real-time reporting</li>
        <li>Flexible recording options</li>
        <li>Compliance and security features</li>
        <li>Event playback</li>
        <li>User-friendly interface</li>
        <li>Data security</li>
      </ul>
    </div>
  );
};

export default FeaturesList;
