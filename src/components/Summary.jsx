import React from "react";

/**
 * Component for displaying a summary
 * @return {JSX.Element} JSX element representing the summary
 */
const Summary = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Summary</h2>
      <p>
        The purpose of this project is to address the challenges associated
        with manual event attendance tracking by developing a comprehensive
        solution that leverages computer vision and AI technologies. The manual methods currently
        in use are time-consuming, error-prone, and lack real-time insights, making it difficult
        for event organizers to manage attendance effectively. We envision an application
        that allows event organizers to seamlessly set up events, implement real-time attendance
        tracking using cameras, and organize historical attendance data for analysis. 
        Our project's design involves capturing event video using a companion app,
        managing administrative functions through our main web app, and implementing an object
        detection algorithm for attendance tracking. The key features include accurate attendance
        counting, real-time reporting, flexible recording options, compliance and security features,
        event playback, user-friendly interface, and data security. In this report, our objective
        is to outline a thorough plan for the implementation of the Event Attendance Tracking
        integrated with Artificial Intelligence project, also known as: EAT with AI.
      </p>
    </div>
  );
};

export default Summary;
