import { FC } from 'react';

interface SkeletonProps {
    lines?: number;
    className?: string;
    animate?: boolean;
    height?: string;
    width?: string;
    dark?: boolean;
}

export const LoadingSkeleton: FC<SkeletonProps> = ({
    lines = 3,
    className = "",
    animate = true,
    height = "h-4",
    width = "w-full",
    dark = false,
}) => {
    return (
        <div className={`${className}`}>
            <div className={`${animate ? 'animate-pulse' : ''}`}>
                <div className={`space-y-3 rounded-md ${dark ? 'bg-gray-700' : 'bg-gray-200'} p-4`}>
                    {Array(lines)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className={`${height} ${width} rounded ${dark ? 'bg-gray-600' : 'bg-gray-300'
                                    } relative overflow-hidden`}
                            >
                                {animate && (
                                    <div
                                        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.5)'
                                                }, transparent)`,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}; 