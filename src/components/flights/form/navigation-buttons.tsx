import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

interface NavigationButtonsProps {
  nextRoute?: string;
  beforeRoute?: string;
  isNextEnabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  nextRoute,
  beforeRoute,
  isNextEnabled,
}) => {
  console.log(nextRoute, beforeRoute, isNextEnabled);
  return (
    <div className="flex flex-row justify-end gap-2">
      {beforeRoute && (
        <Button variant="outline" asChild>
          <Link href={beforeRoute}>
            <ChevronLeftIcon />
            Back
          </Link>
        </Button>
      )}
      {nextRoute && (
        <Button
          disabled={!isNextEnabled}
          type="submit"
          onClick={() => redirect(nextRoute)}
        >
          Next
          <ChevronRightIcon />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
