import React from "react";

/**
 * Component for displaying contact information
 * @return {JSX.Element} JSX element representing the contact information
 */
const ContactInfo = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Contact Information</h2>
      <ul>
        <li>cblank10@vols.utk.edu</li>
        <li>smistry1@vols.utk.edu</li>
        <li>amistry2@vols.utk.edu</li>
        <li>smalluri@vols.utk.edu</li>
      </ul>
    </div>
  );
};

export default ContactInfo;
