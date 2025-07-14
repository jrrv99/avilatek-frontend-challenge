'use client';

import { Trash } from 'lucide-react';
import { FieldArrayWithId, Control, UseFormWatch } from 'react-hook-form';

import RHFCalendarPopover from '@/components/rhf/rhf-calendar-popover';
import RHFSimpleInput from '@/components/rhf/rhf-simple-input';
import RHFSimpleSelect from '@/components/rhf/rhf-simple-select';
import RHFStepperInput from '@/components/rhf/rhf-stepper-input';
import RHFToggleField from '@/components/rhf/rhf-toggle-field';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PET_EXTRA_COST, EXTRA_BAGGAGE_COST } from '@/lib/constants';

import { documentTypes, Traveler, TravelersInformation } from './schemas';

type TravelerCardProps = {
  traveler: FieldArrayWithId<Traveler>;
  index: number;
  control: Control<TravelersInformation>;
  watch: UseFormWatch<TravelersInformation>;
  onDelete: () => void;
  handleCounterFlagChange: (
    index: number,
    key: 'numberOfPets' | 'numberOfExtraBaggage',
    value: boolean,
  ) => void;
};

const TravelerFormInfo: React.FC<TravelerCardProps> = ({
  traveler,
  index,
  control,
  watch,
  onDelete,
  handleCounterFlagChange,
}) => {
  const hasPets = watch(`travelers.${index}.hasPets`);
  const hasExtraBaggage = watch(`travelers.${index}.hasExtraBaggage`);

  return (
    <Card key={traveler.id}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Viajero {index + 1}</CardTitle>
        {index > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`Eliminar viajero ${index + 1}`}
            className="text-destructive hover:bg-destructive/10"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      {/* TODO: make it toggable */}
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 max-md:grid-cols-1">
          <RHFSimpleInput
            name={`travelers.${index}.fullName`}
            control={control}
            label="Nombre Completo"
            placeholder="Nombre del viajero"
          />
          <RHFCalendarPopover
            control={control}
            name={`travelers.${index}.birthDate`}
            label="Fecha de nacimiento"
            placeholder="Selecciona una fecha"
          />
        </div>

        <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 max-md:grid-cols-1">
          <RHFSimpleSelect
            name={`travelers.${index}.documentType`}
            control={control}
            label="Tipo de documento"
            placeholder="Selecciona un tipo de documento"
            options={Object.entries(documentTypes).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <RHFSimpleInput
            name={`travelers.${index}.documentNumber`}
            control={control}
            label="Número de documento"
            placeholder="Ingresa el número de documento"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-md:grid-cols-1">
          <div className="space-y-3">
            <RHFToggleField
              name={`travelers.${index}.hasPets`}
              title="¿Viajas con mascotas?"
              description={`Costo adicional: $${PET_EXTRA_COST} por mascota`}
              control={control}
              onChange={(value: boolean) =>
                handleCounterFlagChange(index, 'numberOfPets', value)
              }
            />
            {hasPets && (
              <RHFStepperInput
                name={`travelers.${index}.numberOfPets`}
                control={control}
                label="Número de mascotas"
                min={1}
                className="items-center"
              />
            )}
          </div>
          <div className="space-y-3">
            <RHFToggleField
              name={`travelers.${index}.hasExtraBaggage`}
              title="¿Necesitas maletas extra?"
              description={`Costo adicional: $${EXTRA_BAGGAGE_COST} por maleta`}
              control={control}
              onChange={(value: boolean) =>
                handleCounterFlagChange(index, 'numberOfExtraBaggage', value)
              }
            />
            {hasExtraBaggage && (
              <RHFStepperInput
                name={`travelers.${index}.numberOfExtraBaggage`}
                control={control}
                label="Cantidad de maletas extra"
                min={1}
                className="items-center"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelerFormInfo;
