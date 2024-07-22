import { FaBusSimple } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoArrowSwitch } from "react-icons/go";
import ToSearch from "./ui/ToSearch";
import FromSearch from "./ui/FromSearch";
import ToSearchResults from "./ui/ToSearchResults";
// import FromSearchResults from "./ui/FromSearchResults";
import DateBook from "./ui/DateBook";
import { fetchFilteredResults } from "./lib/data";
import DropDown from "./ui/DropDown";

export type SP = {
  searchParams?: {
    toquery?: string;
    fromquery?: string;
    fromFocus?: string;
    toqueryFocus?:string;
  };
}

export default async function Page({
  searchParams,
}: SP) {
  const toQuery = searchParams?.toquery || "";
  const fromQuery = searchParams?.fromquery || "";
  const fromFocus = searchParams?.fromFocus || "";
  const toqueryFocus = searchParams?.toqueryFocus|| "";
  const fromSearchResult = await fetchFilteredResults(fromQuery);
  const toSearchResult = await fetchFilteredResults(toQuery)
  return (
    <div>
      <p>{fromQuery}</p>
      <section className=" [&>*]:text-xl relative top-40 flex justify-evenly border border-red-400 rounded-3xl">
        <div className=" relative border-r flex-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <FaBusSimple className="row-[1/-1]" />
          <div className="relative">
            <p className="text-gray-500 text-base">From</p>
            <FromSearch fromSearchResult={fromSearchResult} fromParam={fromQuery}/>
            {/* {fromFocus && fromQuery && (
            )} */}
          </div>
          <div className=" bg-white absolute top-[30%] right-[-6%] border rounded-full w-10 h-10 ">
            <GoArrowSwitch className=" absolute top-[28%] left-[28%] " />
          </div>
        </div>
        <div className="  border-r flex-1 ml-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <FaBusSimple className="row-[1/-1]" />
          <div className="relative">
            <p className="text-gray-500 text-base">To</p>
            {/* <ToSearch /> */}
            {toQuery && toqueryFocus && (
              <section
                id="to--suggestion--wrapper"
                className="bg-gray-300 absolute w-56 h-56 overflow-y-auto bottom-[-16rem]"
              >
                {/* <DropDown searchResult={toSearchResult} inputBox={"to"}/> */}
              </section>
            )}
          </div>
        </div>
        <div className=" border-r flex-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <div>
            <p className="text-gray-500 text-base">Date</p>
            <DateBook />
          </div>
        </div>
        <div className="bg-red-500 flex-[0.65] p-5 grid grid-cols-[1fr] justify-items-center items-center font-bold text-white">
          {" "}
          SEARCH BUSES
        </div>
      </section>
    </div>
  );
}
