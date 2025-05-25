import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

const TypeScriptIcon = forwardRef<SVGSVGElement, LucideProps>(({ size = 24, ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <rect width="24" height="24" fill="#3178C6" rx="4"/>
    <text 
      x="50%" 
      y="68%" 
      fontFamily="Arial, sans-serif" 
      fontSize="14" 
      fontWeight="bold" 
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#fff"
      letterSpacing="0.5"
    >
      TS
    </text>
  </svg>
));

TypeScriptIcon.displayName = 'TypeScriptIcon';

export { TypeScriptIcon };
