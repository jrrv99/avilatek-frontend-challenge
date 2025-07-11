import { notFound } from 'next/navigation';

import { stepExists, steps } from '@/components/flights/form/steps';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  if (!stepExists(slug)) {
    notFound();
  }

  const StepComponent = steps.find(step => step.id === slug)?.component;

  return StepComponent ? <StepComponent /> : notFound();
};

export default Page;
