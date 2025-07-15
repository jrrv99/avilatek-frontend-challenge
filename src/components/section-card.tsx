import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormCardProps {
  title: ReactNode | string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const SectionCard = ({
  title,
  children,
  className,
  titleClassName,
}: FormCardProps) => (
  <Card className={cn('w-full', className)}>
    <CardHeader>
      <CardTitle className={cn('flex items-center gap-2', titleClassName)}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
