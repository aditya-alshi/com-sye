"use client";
import { FaBusSimple } from "react-icons/fa6";
// import FromInput from "./FromInput";
// import ToInput from "./ToInput";
import { cityResults } from "../lib/types";
import React from "react";

import { submitFormData } from "../lib/actions/actions";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Form({
  fromStation,
  toStation,
}: {
  fromStation: cityResults[];
  toStation: cityResults[];
}) {
  const FromRef = React.useRef<HTMLFormElement>(null);

  const [formData, setFormData] = React.useState({
    fromCity: "",
    toCity: "",
    fromFocus: false,
    toFocus: false,
  });

  // const [fromValue, setFromValue] = React.useState("");
  // const [focus, setFocus] = React.useState(false);
  const FcityListRef = React.useRef<HTMLDivElement>(null);
  const cityListRefTo = React.useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  React.useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!FcityListRef.current?.contains(e.target as Node)) {
        setFormData((prev) => ({
          ...prev,
          fromFocus: false,
        }));
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  React.useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!cityListRefTo.current?.contains(e.target as Node)) {
        setFormData((prev) => ({
          ...prev,
          toFocus: false,
        }));
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const addQueryFrom = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (formData.fromCity !== "") {
      params.set("fromStation", formData.fromCity);
    } else {
      params.delete("fromStation");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const addQueryTo = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (formData.toCity !== "") {
      params.set("toStation", formData.toCity);
    } else {
      params.delete("toStation");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (name: string, term: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: term,
    }));
    if (name === "fromCity") {
      addQueryFrom();
      setFormData((prev) => ({
        ...prev,
        fromFocus: true,
      }));
    } else if (name === "toCity") {
      addQueryTo();
      setFormData((prev) => ({
        ...prev,
        toFocus: true,
      }));
    }
  };

  const renderCitiesDropDown = fromStation.map((city) => (
    <div
      className=" cursor-pointer w-fit p-2 border-b"
      key={city.cityId}
      onClick={() => {
        setFormData((prev) => ({
          ...prev,
          fromCity: city.cityName,
        }));
        setFormData((prev) => ({
          ...prev,
          fromFocus: false,
        }));
      }}
    >
      {city.cityName}
    </div>
  ));

  const renderToCitiesDropDown = toStation.map((city) => (
    <div
      className=" w-fit p-1 cursor-pointer"
      key={city.cityId}
      onClick={() => {
        setFormData((prev) => ({
          ...prev,
          toCity: city.cityName,
        }));

        setFormData((prev) => ({
          ...prev,
          toFocus: false,
        }));
      }}
    >
      {city.cityName}
    </div>
  ));

  const handleSubmit = async (formData: FormData) => {
    await submitFormData(formData);
    setFormData((prev) => ({
      ...prev,
      toCity: "",
      fromCity: "",
    }));
    FromRef.current?.reset();
    replace(`${pathname}`);
  };

  return (
    <form
      ref={FromRef}
      action={handleSubmit}
      className=" rounded-xl flex justify-evenly bg-white text-center border border-fuchsia-950 mt-36"
    >
      <div className="relative flex items-center w-full mr-auto border-r py-7 px-3 ">
        <FaBusSimple className=" text-fuchsia-800 mx-5" />
        {/* <FromInput fromStation={fromStation} /> */}
        <label className="mr-3" htmlFor="fromStation">
          From
        </label>
        <input
          required
          onFocus={() => {
            setFormData((prev) => ({
              ...prev,
              fromFocus: true,
            }));
          }}
          className=" border border-blue-600 p-1"
          id="fromCity"
          name="fromCity"
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          value={formData.fromCity}
          type="text"
        />
        {formData.fromFocus && fromStation.length > 0 && (
          <div
            className=" overflow-y-auto max-h-56 absolute w-fit bg-white border border-fuchsia-950 top-[6.5rem] left-[7rem]"
            ref={FcityListRef}
          >
            {renderCitiesDropDown}
          </div>
        )}
      </div>
      <div className="relative flex items-center w-full mr-auto border-r py-7 px-3">
        <FaBusSimple className=" text-fuchsia-800 mx-5" />
        {/* <ToInput toStation={toStation} /> */}
        <label className="mr-3" htmlFor="toStation">
          To
        </label>
        <input
          required
          onFocus={() => {
            setFormData((prev) => ({
              ...prev,
              toFocus: true,
            }));
            setFormData((prev) => ({
              ...prev,
              toFocus: true,
            }));
          }}
          className=" border border-blue-600 p-1"
          id="toCity"
          name="toCity"
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          value={formData.toCity}
          type="text"
        />
        {formData.toFocus && toStation.length > 0 && (
          <div
            className=" overflow-y-auto max-h-56 absolute w-fit bg-white border border-fuchsia-950 top-[6.5rem] left-[7rem]"
            ref={cityListRefTo}
          >
            {renderToCitiesDropDown}
          </div>
        )}
      </div>
      <div className="flex items-center w-full mr-auto py-7 border-r px-3">
        <input
          className="p-2 w-1/2"
          type="date"
          name="booking-for-date"
          required
        />
      </div>
      <button
        className="text-center text-white text-xl  bg-fuchsia-800 flex items-center w-1/5 rounded-r-xl py-7 px-10"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
