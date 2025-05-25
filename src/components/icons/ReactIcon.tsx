import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

const ReactIcon = forwardRef<SVGSVGElement, LucideProps>(({ color = 'currentColor', size = 24, ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="-11.5 -10.23174 23 20.46348"
    width={size}
    height={size}
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill={color} />
    <g stroke={color} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
));

ReactIcon.displayName = 'ReactIcon';

export { ReactIcon };
