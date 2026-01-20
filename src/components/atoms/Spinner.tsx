import { useProgressBar } from "react-aria";

export interface SpinnerProps {
  size?: number;
}

export function Spinner(props: SpinnerProps) {
  const { progressBarProps } = useProgressBar({ isIndeterminate: true });

  const center = 16;
  const strokeWidth = 4;
  const r = 16 - strokeWidth;
  const c = 2 * r * Math.PI;
  const percentage = 0.25;
  const offset = c - percentage * c;

  return (
    <svg
      {...progressBarProps}
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        className="stroke-slate-200 dark:stroke-slate-700"
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        className="stroke-orange-500"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="1s"
          from="0 16 16"
          to="360 16 16"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
