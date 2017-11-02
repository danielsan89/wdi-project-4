import React from 'react';

const BackButton = ({ history }) => {
  return (
    <div>
      <button type="button" onClick={history.goBack} className="btn btn-primary">
        <span className="glyphicon glyphicon-arrow-left"></span>
      </button>
    </div>
  );
};

export default BackButton;
