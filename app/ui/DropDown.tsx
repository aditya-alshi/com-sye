"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function DropDown({
  searchResult,
  inputBox,
  changeCity
}: {
  searchResult: {
    cityId: string;
    cityName: string;
  }[]  ;
  inputBox: "from" | "to";
  changeCity : (city : string) => void
} ) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCityClick = (value: string) => {
    // const params = new URLSearchParams(searchParams);
    // params.set(`${inputBox}query`, value);
    // replace(`${pathname}?${params.toString()}`);
    changeCity(value)
  };

  const renderResults = searchResult.map((city) => (
    <div 
      className=" cursor-pointer"
      key={city.cityId} 
      id={city.cityName}
      onClick={(e) => {
        handleCityClick((e.target as HTMLDivElement).id)
      }}
    >
      {city.cityName}
    </div>
  ));
  return (
    <div>
      {renderResults}
    </div>
  );
}
