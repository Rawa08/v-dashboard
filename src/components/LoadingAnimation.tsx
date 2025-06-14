'use client';

import Lottie from 'lottie-react';
import animationJson from '@public/animations/loading.json';

const LoadingAnimation = ({ className }: { className?: string }) => (
  <div className={className ?? 'fixed inset-0 z-50 flex items-center justify-center bg-black'}>
    <Lottie animationData={animationJson} loop={true} style={{ width: 150, height: 150 }} />
  </div>
);

export default LoadingAnimation;
