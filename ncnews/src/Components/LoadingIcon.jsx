import React from 'react';
import ReactLoading from "react-loading"

const LoadingIcon = () => {
  return <div><ReactLoading type="bubbles" color="pink" height={667} width={375}/>
  <h1>Loading...</h1>
    </div>;
};

export default LoadingIcon;