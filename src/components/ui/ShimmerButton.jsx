import React from 'react';

const ShimmerButton = React.forwardRef(function ShimmerButton(
  {
    shimmerColor = '#ffffff',
    shimmerSize = '0.05em',
    shimmerDuration = '3s',
    borderRadius = '8px',
    background = 'rgba(0,0,0,1)',
    className = '',
    children,
    ...props
  },
  ref
) {
  return (
    <button
      style={{
        '--spread': '90deg',
        '--shimmer-color': shimmerColor,
        '--radius': borderRadius,
        '--speed': shimmerDuration,
        '--cut': shimmerSize,
        '--bg': background,
      }}
      className={[
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap',
        'border border-white/10 px-5 py-2.5 text-sm font-medium text-white',
        '[background:var(--bg)] [border-radius:var(--radius)]',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
        className,
      ].join(' ')}
      ref={ref}
      {...props}
    >
      {/* shimmer layer */}
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div
          className="absolute inset-0 h-[100cqh] [aspect-ratio:1]"
          style={{ animation: 'shimmer-slide var(--speed) ease-in-out infinite alternate' }}
        >
          <div
            style={{ animation: 'spin-around calc(var(--speed) * 2) infinite linear' }}
            className="absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"
          />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 rounded-[inherit] px-4 py-1.5 shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </button>
  );
});

export { ShimmerButton };
