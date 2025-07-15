'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import {
  StepDataMap,
  TravelBookingForm,
} from '@/components/flights/form/schemas';
import { FlightStepIds } from '@/components/flights/form/steps';

const LOCAL_STORAGE_KEY = 'TRAVEL_BOOKING_FORM_DATA';

type FormDataByStep = Partial<StepDataMap>;

type FormContextType = {
  data: FormDataByStep;
  updateStepData: <T extends keyof StepDataMap>(
    stepId: T,
    newData: Partial<StepDataMap[T]>,
  ) => void;
  getCombinedData: () => TravelBookingForm | null;
  clearData: () => void;
  dataLoaded: boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const BookingFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<FormDataByStep>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  // Leer localStorage solo una vez al montar
  const readFromLocalStorage = useCallback(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Aquí podrías validar con Zod si quieres
        setData(parsed);
      } catch {
        setData({});
      }
    } else {
      setData({});
    }
    setDataLoaded(true);
  }, []);

  // Guardar en localStorage solo después de cargar datos iniciales
  useEffect(() => {
    readFromLocalStorage();
  }, [readFromLocalStorage]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, dataLoaded]);

  const updateStepData = useCallback(
    <T extends keyof StepDataMap>(
      stepId: T,
      newData: Partial<StepDataMap[T]>,
    ) => {
      setData(prev => ({
        ...prev,
        [stepId]: {
          ...prev[stepId],
          ...newData,
        },
      }));
    },
    [],
  );

  const getCombinedData: () => TravelBookingForm | null = useCallback(
    () =>
      ({
        ...data[FlightStepIds.TRAVEL_INFORMATION],
        ...data[FlightStepIds.TRAVELERS_INFORMATION],
        ...data[FlightStepIds.ADDITIONAL_SERVICES],
      }) as TravelBookingForm,
    [data],
  );

  const clearData = useCallback(() => {
    setData({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      updateStepData,
      getCombinedData,
      clearData,
      dataLoaded,
    }),
    [data, updateStepData, getCombinedData, clearData, dataLoaded],
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useBookingFormData = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useBookingFormData must be used within a FormProvider');
  }
  return context;
};
