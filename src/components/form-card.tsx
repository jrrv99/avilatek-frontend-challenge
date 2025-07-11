import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FormCardProps {
  title: string;
  nextRoute?: string;
  beforeRoute?: string;
  children: React.ReactNode;
}

export const FormCard = ({
  title,
  nextRoute,
  beforeRoute,
  children,
}: FormCardProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="mx-auto">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter className="flex-row justify-end gap-2">
      {beforeRoute && (
        <Button variant="outline" asChild>
          <Link href={beforeRoute}>
            <ChevronLeftIcon />
            Back
          </Link>
        </Button>
      )}
      {nextRoute && (
        <Button asChild>
          <Link href={nextRoute}>
            Next
            <ChevronRightIcon />
          </Link>
        </Button>
      )}
    </CardFooter>
  </Card>
);
