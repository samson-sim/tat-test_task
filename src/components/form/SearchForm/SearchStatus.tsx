"use client";

import { useSearch } from "../../../context";

export const SearchStatus = () => {
  const { status, error, isLoading, prices } = useSearch();

  if (status === "idle") return null;

  if (isLoading) {
    return (
      <div className="max-w-sm w-full bg-white rounded-2xl p-4 shadow-sm text-center text-gray-700">
        <span className="block font-medium mb-1">Йде пошук турів…</span>
        <span className="text-sm text-gray-500">
          Будь ласка, зачекайте. Ми отримуємо актуальні пропозиції.
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-sm w-full bg-white rounded-2xl p-4 shadow-sm border border-red-200 text-red-700">
        <div className="font-semibold mb-1">Сталася помилка</div>
        <div className="text-sm">{error || "Щось пішло не так."}</div>
      </div>
    );
  }

  if (status === "success") {
    if (!prices.length) {
      return (
        <div className="max-w-sm w-full bg-white rounded-2xl p-4 shadow-sm text-center text-gray-700">
          <div className="font-semibold mb-1">
            За вашим запитом турів не знайдено
          </div>
          <div className="text-sm text-gray-500">
            Спробуйте змінити напрямок або дати подорожі.
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-sm w-full bg-white rounded-2xl p-4 shadow-sm text-gray-800">
        <div className="font-semibold mb-2">
          Знайдено {prices.length} пропозицій
        </div>
      </div>
    );
  }

  return null;
};
