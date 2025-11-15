import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};
