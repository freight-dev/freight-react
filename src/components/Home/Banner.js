import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  const backgroundImage = "banner.jpg";
  return (
    <div className="banner" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "100%", backgroundBlendMode: "overlay", backgroundPosition: "0% 85%"}}>
      <div className="container" style={{height: 400}}>
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default Banner;
