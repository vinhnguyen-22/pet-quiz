import React from 'react';
import { withRouter } from 'react-router-dom';

const MinimalLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default withRouter(MinimalLayout);
