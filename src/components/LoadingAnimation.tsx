'use client';

import Lottie from 'lottie-react';
import animationJson from '@public/animations/loading.json';

type Props = {
  className?: string;
  size?: number;
  overlay?: boolean;
  centered?: boolean;
};

const LoadingAnimation = ({
  className,
  size = 150,
  overlay = true,
  centered = true,
}: Props) => {
  const baseClasses = [
    overlay ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : '',
    centered ? 'flex items-center justify-center' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={baseClasses}>
      <Lottie animationData={animationJson} loop style={{ width: size, height: size }} />
    </div>
  );
};

export default LoadingAnimation;
