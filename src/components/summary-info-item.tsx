type SummaryInfoItemProps = {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
};

const SummaryInfoItem: React.FC<SummaryInfoItemProps> = ({
  label,
  value,
  icon,
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <p className="text-primary text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default SummaryInfoItem;
