// components/icons/MessageIcon.tsx

import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MessageIcon = ({ color = '#AAAAAA', size = 19 }) => {
  return (
    <Svg
      width={size}
      height={(size * 15) / 19}
      viewBox="0 0 19 15"
      fill="none"
    >
      <Path
        d="M12.8253 5.45116C14.4183 4.18826 16.5562 2.96664 16.9606 3.40411C17.6292 4.12223 17.5715 10.9567 16.9606 11.6088C16.5892 12.0133 14.4348 10.7916 12.8253 9.537"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00612 7.5C1.00612 2.99979 2.50096 1.5 6.98713 1.5C11.4725 1.5 12.9673 2.99979 12.9673 7.5C12.9673 11.9994 11.4725 13.5 6.98713 13.5C2.50096 13.5 1.00612 11.9994 1.00612 7.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MessageIcon;
