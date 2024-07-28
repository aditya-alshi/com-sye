"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  toStation,
}: {
  toStation: {
    cityId: string;
    cityName: string;
  }[];
}) {
    
    
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [toValue, setToValue] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const cityListRefTo = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let handler = (e : MouseEvent) => {
        if(!cityListRefTo.current?.contains(e.target as Node)){
            setFocus(false)
        }
    }
    
    document.addEventListener("mousedown", handler )
  })

  const addQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (toValue !== "") {
      params.set("toStation", toValue);
    } else {
      params.delete("toStation");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (term: string) => {
    console.log(focus)
    setToValue(term);
    addQuery();
    setFocus(true)
  };

  const renderCitiesDropDown = toStation.map(city => (
    <div
        className=" w-fit p-1 cursor-pointer"
        key={city.cityId}
        onClick={() => {
            setToValue(city.cityName)
            addQuery();
            setFocus(false)
        }}
    >
        {city.cityName}
    </div>
  ))

  return (
    <div className=" relative">
      <label className="mr-3" htmlFor="toStation">To</label>
      <input
        required
        onFocus={() => {
            setFocus(true)
        }}
        className=" border border-blue-600 p-1"
        id="toStation"
        name="toStation"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={toValue}
        type="text"
      />
      {
        focus && toStation.length > 0 && 
        <div 
            className=" overflow-y-auto max-h-56 absolute w-fit bg-white border border-fuchsia-950 top-[2.5rem] left-[1.8rem]"
            ref={cityListRefTo}
            >
            {renderCitiesDropDown}
        </div>
      }
    </div>
  );
}
