import React from 'react';

const ErrorPage = (err) => {
  return (
    <div>
      <h1>
        Status: {err.status}, {err.msg}
      </h1>
    </div>
  );
};

export default ErrorPage;