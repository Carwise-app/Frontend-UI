// components/BlinkingScrollHint.jsx
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';


export default function BlinkingScrollHint() {

  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () =>{
      if(window.scrollY > 150) {
        setShowScroll(false);
      } else {
        setShowScroll(true)
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll",handleScroll)
  },[])

  return (
    <>
    {showScroll && 
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <Typography className="text-gray-700 ">
            {/* <span className="text-2xl">↓</span> */}
            <KeyboardDoubleArrowDownIcon sx={{fontSize:64}}/>
        </Typography>
    </div>
    }
    </>
  );
};


