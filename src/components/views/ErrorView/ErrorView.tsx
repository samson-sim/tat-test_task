import { FC } from "react";

interface ErrorViewProps {
  error: string;
}

export const ErrorView: FC<ErrorViewProps> = ({ error }) => {
  return (
    <div className="text-red-600 font-medium" role="alert">
      {error}
    </div>
  );
};
