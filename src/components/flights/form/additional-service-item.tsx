import { Check } from 'lucide-react';

type AdditionalServiceItemProps = {
  icon: React.ReactNode;
  label: string;
  note?: string;
  noteColor?: string;
};

const AdditionalServiceDetails: React.FC<AdditionalServiceItemProps> = ({
  icon,
  label,
  note,
  noteColor = 'red-600',
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
      <Check className="ml-auto h-4 w-4 text-green-600" />
    </div>
    {note && (
      <blockquote
        className={`ml-6 rounded border-l-4 border-${noteColor} bg-gray-100 p-4 text-sm break-words text-gray-700 italic`}
      >
        Nota: {note}
      </blockquote>
    )}
  </div>
);

export default AdditionalServiceDetails;
