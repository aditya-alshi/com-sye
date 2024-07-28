import { FaBusSimple } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoArrowSwitch } from "react-icons/go";
import FromInput from "./components/FromInput";
import ToInput from "./components/ToInput";

import { getFromStations } from "./lib/data";
import { submitFormData } from "./lib/actions/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filteredFromCities = await getFromStations(
    searchParams?.fromStation as string
  );
  const filteredToCities = await getFromStations(
    searchParams?.toStation as string
  );

 
  return (
    <form 
      action={submitFormData}
      className=" rounded-xl flex justify-evenly bg-white text-center border border-fuchsia-950 mt-36"
    >
      <div className="flex items-center w-full mr-auto border-r py-7 px-3 ">
        <FaBusSimple className=" text-fuchsia-800 mx-5"  />
        <FromInput fromStation={filteredFromCities || []} />
      </div>
      <div className="flex items-center w-full mr-auto border-r py-7 px-3">
        <FaBusSimple className=" text-fuchsia-800 mx-5" />
        <ToInput toStation={filteredToCities || []} />
      </div>
      <div className="flex items-center w-full mr-auto py-7 border-r px-3">
        <input className="p-2 w-1/2" type="date" name="booking-for-date" required/>
      </div>
      <button className="text-center text-white text-xl  bg-fuchsia-800 flex items-center w-1/5 rounded-r-xl py-7 px-10" type="submit">Submit</button>
    </form>
  );
}
