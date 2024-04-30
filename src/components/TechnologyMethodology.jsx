import React from "react";

/**
 * Component for displaying technology/methodology details
 * @return {JSX.Element} JSX element representing the technology/methodology details
 */
const TechnologyMethodology = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Technology/Methodology</h2>
      <p>
        Our project is broken down into four major parts: an administrative
        app, a companion app, backend server/database, and finally our object
        detection algorithm. The administrative app will serve all administrative functions
        of the project for the user. This will include creating events, managing old events,
        and account settings. The companion app will stream video back to the server to be analyzed.
        Using a companion app to capture video allows for maximum flexibility over alternative
        options such as security cameras. The server and database will serve all our backend needs,
        mainly storage and processing. Finally, our object detection algorithm will process our
        livestream video and allow us to track attendance. The companion app will be written in
        React native, the backend code will be written in node.js, the frontend code will be written
        in React.js, and the object detection algorithm will be written in Python.
      </p>
    </div>
  );
};

export default TechnologyMethodology;
