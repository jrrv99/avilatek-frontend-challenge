import { ChevronLeftIcon, ChevronRightIcon, Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  nextRoute?: string;
  beforeRoute?: string;
  isNextEnabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  onNext?: () => void | Promise<void>; // Custom function for the Next button
  isLoading?: boolean; // To show loading on the button
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  nextRoute,
  beforeRoute,
  isNextEnabled = true,
  nextLabel = 'Next',
  backLabel = 'Back',
  onNext,
  isLoading = false,
}) => {
  const { push } = useRouter();

  const handleNext = async () => {
    if (onNext) {
      await onNext(); // custom next action
    } else if (nextRoute) {
      push(nextRoute); // by default, navigate to the next route
    }
  };

  return (
    <div className="flex flex-row justify-end gap-2">
      {beforeRoute && (
        <Button variant="outline" disabled={isLoading} asChild>
          <Link href={beforeRoute}>
            <ChevronLeftIcon />
            {backLabel}
          </Link>
        </Button>
      )}

      {(nextRoute || onNext) && (
        <Button
          disabled={!isNextEnabled || isLoading}
          type="submit"
          onClick={handleNext}
        >
          {isLoading && <Loader className="animate-spin" />}
          {nextLabel}
          <ChevronRightIcon />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
