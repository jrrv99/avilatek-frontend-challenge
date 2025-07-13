import { ReactNode } from 'react';
import { Loader, TriangleAlert, RefreshCw, Plane, Info } from 'lucide-react';

import { Button } from './ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';

type StatusType = 'error' | 'empty' | 'loading' | 'info';

type StatusComponentProps = {
  title: string;
  description?: string;
  isLoading?: boolean;
  onReload?: () => void;
  icon?: ReactNode;
  type?: StatusType;
  reloadLabel?: string;
};

const defaultIcons: Record<StatusType, ReactNode> = {
  error: (
    <div className="bg-destructive-foreground text-destructive mx-auto mb-3 flex size-12 shrink-0 items-center justify-center rounded-full">
      <TriangleAlert />
    </div>
  ),
  empty: (
    <div className="text-primary mx-auto mb-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-200">
      <Plane />
    </div>
  ),
  loading: (
    <div className="text-primary mx-auto mb-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-200">
      <Loader className="animate-spin" />
    </div>
  ),
  info: (
    <div className="text-primary mx-auto mb-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-200">
      <Info />
    </div>
  ),
};

const StatusComponent: React.FC<StatusComponentProps> = ({
  title,
  description,
  isLoading = false,
  onReload,
  icon,
  type = 'info',
  reloadLabel = 'Reintentar',
}) => {
  const renderIcon = icon ?? defaultIcons[type];

  return (
    <Card>
      <CardHeader className="text-center">
        {renderIcon}
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {onReload && (
        <CardFooter className="justify-center">
          <Button onClick={onReload} disabled={isLoading} type="button">
            {!isLoading && <RefreshCw />}
            {isLoading && <Loader className="animate-spin" />}
            {!isLoading ? reloadLabel : 'Cargando...'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatusComponent;
