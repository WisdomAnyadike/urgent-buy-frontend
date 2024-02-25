import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function TimeAgo({ timestamp }) {
  return (
    <span>
      {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
    </span>
  );
}

export default TimeAgo;
