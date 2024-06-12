import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function TimeAgo({ timestamp }) {
  return (
    <span>
     <small> {formatDistanceToNow(new Date(timestamp), { addSuffix: true })} </small> 
    </span>
  );
}

export default TimeAgo;
