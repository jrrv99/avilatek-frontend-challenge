import { notFound } from 'next/navigation';

import { stepExists, steps } from '@/components/flights/form/steps';
import { FormCard } from '@/components/form-card';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  if (!stepExists(slug)) {
    notFound();
  }

  const step = steps.find(_step => _step.id === slug)!;
  const StepComponent = step?.component || notFound();

  return (
    <section className="w-screen px-8">
      <FormCard
        title={step.title}
        beforeRoute={step?.beforeRoute}
        nextRoute={step?.nextRoute}
      >
        <StepComponent />
      </FormCard>
    </section>
  );
};

export default Page;
