import React from 'react';

import './Message.css';

const Message = ({ children, variant }) => {
  console.log(variant);
  return (
    <div className={variant === 'danger' ? 'message danger' : 'message'}>
      {children}
    </div>
  );
};

export default Message;
