import React from "react";
import saish from "../saish.JPEG";

/**
 * Component for displaying an image
 * @return {JSX.Element} JSX element representing the image
 */
const ImageSection = () => {
  return (
    <div>
      <img src={saish} alt="saishpicture" height={"200"} width={"200"} />
    </div>
  );
};

export default ImageSection;

