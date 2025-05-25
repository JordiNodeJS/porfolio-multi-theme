import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

const JavaScriptIcon = forwardRef<SVGSVGElement, LucideProps>(({ size = 24, ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
    <text 
      x="50%" 
      y="70%" 
      fontFamily="Arial, sans-serif" 
      fontSize="14" 
      fontWeight="bold" 
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#000"
    >
      JS
    </text>
  </svg>
));

JavaScriptIcon.displayName = 'JavaScriptIcon';

export { JavaScriptIcon };
