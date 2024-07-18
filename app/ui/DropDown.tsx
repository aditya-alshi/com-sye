"use client";

import { useSearchParams } from "next/navigation";

export default function DropDown({
  searchResult,
  inputBox,
}: {
  searchResult: {
    cityId: string;
    cityName: string;
  }[];
  inputBox: "from" | "to";
}) {

    const searchParams = useSearchParams();

  const renderResults = searchResult.map((city) => (
    <div key={city.cityId}>{city.cityName}</div>
  ));
  return <div>{renderResults}</div>;
}
