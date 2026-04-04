import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  loading?: boolean;
}

export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1,
  loading = false,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [spring]);

  if (loading) {
    return (
      <span className="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse" />
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    </motion.span>
  );
}
