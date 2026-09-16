import React from 'react';
import { AnimatedTitle } from '../motion/AnimatedTitle';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  actions,
  titleClassName,
  descriptionClassName
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
      <div className="flex flex-col gap-[8px] max-w-full">
        <AnimatedTitle
          title={title}
          className={titleClassName || "font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[30px] text-[#0f1a34] flex items-center min-h-[30px]"}
        />
        {description && (
          <p className={descriptionClassName || "font-['Inter'] font-normal text-[14px] leading-[24px] text-[#6B7280] dark:text-zinc-400 max-w-[1002px]"}>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0 sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
};
