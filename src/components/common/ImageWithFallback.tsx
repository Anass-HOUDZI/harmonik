import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function ImageWithFallback({ 
  src, 
  fallbackSrc = "/harmonik-logo.svg", 
  alt, 
  className,
  onError,
  ...props 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.(e);
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      loading="lazy"
    />
  );
}