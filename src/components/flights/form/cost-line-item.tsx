type CostLineItemProps = {
  label: string;
  amount: number;
  quantity?: number;
  isTotal?: boolean;
};

const CostLineItem: React.FC<CostLineItemProps> = ({
  label,
  amount,
  quantity,
  isTotal = false,
}) => {
  const displayLabel =
    quantity !== undefined ? `${label} (${quantity})` : label;

  return (
    <div
      className={`flex justify-between ${isTotal ? 'text-primary text-lg font-bold' : ''}`}
    >
      <span>{displayLabel}</span>
      <span>${amount}</span>
    </div>
  );
};

export default CostLineItem;
