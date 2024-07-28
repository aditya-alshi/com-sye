"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  fromStation,
}: {
  fromStation: {
    cityId: string;
    cityName: string;
  }[];
}) {
    
    
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [fromValue, setFromValue] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const cityListRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let handler = (e : MouseEvent) => {
        if(!cityListRef.current?.contains(e.target as Node)){
            setFocus(false)
        }
    }
    
    document.addEventListener("mousedown", handler )
  })

  const addQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (fromValue !== "") {
      params.set("fromStation", fromValue);
    } else {
      params.delete("fromStation");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (term: string) => {
    console.log(focus)
    setFromValue(term);
    addQuery();
    setFocus(true)
  };

  const renderCitiesDropDown = fromStation.map(city => (
    <div
        className=" cursor-pointer w-fit p-2 border-b"
        key={city.cityId}
        onClick={() => {
            setFromValue(city.cityName)
            addQuery();
            setFocus(false)
        }}
        
    >
        {city.cityName}
    </div>
  ))

  return (
    <div className="relative">
      <label className="mr-3" htmlFor="fromStation">From</label>
      <input
        required
        onFocus={() => {
            setFocus(true)
        }}
        className=" border border-blue-600 p-1"
        id="fromStation"
        name="fromStation"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={fromValue}
        type="text"
      />
      {
        focus && fromStation.length > 0 &&
        <div 
            className=" overflow-y-auto max-h-56 absolute w-fit bg-white border border-fuchsia-950 top-[2.5rem] left-[3rem]"
            ref={cityListRef}
            >
            {renderCitiesDropDown}
        </div>
      }
    </div>
  );
}
