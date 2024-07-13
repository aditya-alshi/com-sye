import { FaBusSimple } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoArrowSwitch } from "react-icons/go";
import Suggestion from "./ui/suggestions";
import Search from "./ui/search";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}){
  
  const query = searchParams?.query || '';
  return(
    <div>
      <section className="overflow-hidden [&>*]:text-xl relative top-40 flex justify-evenly border border-red-400 rounded-3xl">
        <div className=" relative border-r flex-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <FaBusSimple className="row-[1/-1]" />
          <div >
            <p className="text-gray-500 text-base">From</p>
            <Search />
          </div>
          <div className=" bg-white absolute top-[30%] right-[-6%] border rounded-full w-10 h-10 " >
            <GoArrowSwitch className=" absolute top-[28%] left-[28%] "/>
          </div>
        </div>
        <div className="  border-r flex-1 ml-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <FaBusSimple className="row-[1/-1]" />
          <div>
            <p className="text-gray-500 text-base">To</p>
            <div>Delhi</div>
          </div>
        </div>
        <div className=" border-r flex-1 p-5 grid grid-cols-[1fr_4fr] justify-items-start items-center  ">
          <SlCalender className="row-[1/-1]"/>
          <div>
            <p className="text-gray-500 text-base">Date</p>
            <div>24/5/24</div>
            <div>year</div>
          </div>
        </div>
        <div className="bg-red-500 flex-[0.65] p-5 grid grid-cols-[1fr] justify-items-center items-center font-bold text-white"> SEARCH BUSES</div>
      </section>
        <section className=" relative bottom-[-11rem] left-[4rem]">
          <Suggestion query={query}/>
        </section>
        <section className="hidden relative bottom-[-11rem] left-[25rem]">
          {/* <Suggestion /> */}
        </section>
    </div>
  )
}