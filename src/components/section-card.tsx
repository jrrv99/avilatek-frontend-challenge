import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormCardProps {
  title: ReactNode | string;
  children: React.ReactNode;
  titleClassName?: string;
}

export const SectionCard = ({
  title,
  children,
  titleClassName,
}: FormCardProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className={cn('flex items-center gap-2', titleClassName)}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
