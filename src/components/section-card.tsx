import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard = ({ title, children }: FormCardProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="mx-auto">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
