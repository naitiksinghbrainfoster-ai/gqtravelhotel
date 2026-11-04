import React, { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Text shown inside the placeholder when the image is missing (e.g. initials). */
  fallback?: string;
};

/** Shows the image; if the file is missing, shows a neat placeholder instead of a broken icon. */
const ImageWithFallback: React.FC<Props> = ({ src, alt, className = '', fallback = 'Picture here' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-[oklch(0.92_0.03_188.216)] text-[oklch(0.437_0.078_188.216)] ${className}`}
      >
        <span className="text-lg font-semibold">{fallback}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
};

export default ImageWithFallback;