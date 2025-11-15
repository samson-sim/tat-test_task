"use client";
import {
  Children,
  ReactElement,
  ReactNode,
  createElement,
  isValidElement,
} from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormProps<TFormValues extends FieldValues> {
  defaultValues?: DefaultValues<TFormValues>;
  children: ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  className?: string;
}

export const Form = <TFormValues extends FieldValues = FieldValues>({
  defaultValues,
  children,
  onSubmit,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }

          const element = child as ReactElement<{ name?: string }>;
          if (!element.props.name) {
            return element;
          }

          return createElement(element.type, {
            ...element.props,
            register: methods.register,
            key: element.props.name,
          });
        })}
      </form>
    </FormProvider>
  );
};
