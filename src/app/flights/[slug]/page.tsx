import { notFound } from 'next/navigation';

import AdditionalServicesForm from '@/components/flights/form/additional-services-form';
import {
  isFlightStepId,
  stepExists,
  getStepById,
} from '@/components/flights/form/steps';
import SummaryConfirmationForm from '@/components/flights/form/summary-confirmation-form';
import TravelInformationForm from '@/components/flights/form/travel-information-form';
import TravelersInformationForm from '@/components/flights/form/travelers-information-form';
import { SectionCard } from '@/components/section-card';
import { BookingFormProvider } from '@/contexts/flightFormContext';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stepComponents: { [key: string]: React.FC } = {
  'travel-information': TravelInformationForm,
  'travelers-information': TravelersInformationForm,
  'additional-services': AdditionalServicesForm,
  'summary-confirmation': SummaryConfirmationForm,
};

const Page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  if (!isFlightStepId(slug) || !stepExists(slug)) {
    notFound();
  }

  const step = getStepById(slug)!;
  const StepComponent = stepComponents[slug] || notFound();

  return (
    <BookingFormProvider>
      <section className="w-screen px-8">
        <SectionCard title={step.title} titleClassName="mx-auto">
          <StepComponent />
        </SectionCard>
      </section>
    </BookingFormProvider>
  );
};

export default Page;
