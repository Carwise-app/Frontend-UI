import React, { useState, useEffect } from 'react';

export default function AnimatedPrice({ targetPrice, duration = 2000 }) {
  const [displayedPrice, setDisplayedPrice] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = targetPrice;
    const steps = 60; // kaça bölecek, yani kaçar kaçar artacak
    const increment = (end - start) / steps;
    const intervalTime = duration / steps;

    let current = start;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(interval);
        setDisplayedPrice(end);
      } else {
        setDisplayedPrice(current);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [targetPrice, duration]);

  return (
    <div className="text-6xl font-bold text-center text-black">
      {displayedPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
    </div>
  );
}
