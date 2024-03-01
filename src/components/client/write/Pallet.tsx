import React, { useState } from "react";

export default function Pallet({
  colorChange,
  isDraw,
  setIsDraw,
  colors,
}: {
  colorChange: (color: string) => void;
  isDraw: boolean;
  setIsDraw: (isDraw: boolean) => void;
  colors: string[];
}) {
  const [color, setColor] = useState<string>("#000000");
  const onClickColor = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setColor(target.value);
    colorChange(target.value);
    setIsDraw(true);
  };

  return (
    <ul
      id="PALLET"
      className="items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 border-r-0 flex mx-auto mt-3"
    >
      {colors.map((_color) => (
        <li
          key={_color}
          className={`border-b border-gray-200 sm:border-b-0 sm:border-r  ${
            isDraw && color === _color && "bg-gray-300"
          }`}
        >
          <label className="w-full p-1 text-sm flex items-center justify-center">
            <div className={`w-3 h-3 ${`bg-[${_color}]`}`}></div>
            <input
              onClick={onClickColor}
              value={_color}
              type="radio"
              className="hidden"
            />
          </label>
        </li>
      ))}
      <li
        className={`border-b border-gray-200 sm:border-b-0 sm:border-r  ${
          !isDraw && "bg-gray-300"
        }`}
      >
        <label>
          <button
            type="button"
            className="w-full p-1 text-sm flex items-center justify-center"
            onClick={() => {
              setIsDraw(false);
            }}
          >
            <div className="w-3 h-3 border-red-500  border-2"></div>
            <div className="w-0 h-3 border-red-500  border-r-2 rotate-45 absolute transform skew-y-20"></div>
          </button>
        </label>
      </li>
    </ul>
  );
}
