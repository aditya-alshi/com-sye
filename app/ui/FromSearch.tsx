'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DropDown from "./DropDown";
import React from "react";

export default function FromSearch({
     fromSearchResult
} : {
    fromSearchResult: {
        cityId: string;
        cityName: string;
      }[]
 }
) {
    const dropdownRef = React.useRef<HTMLElement>(null);
    const inputElementRef = React.useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    
    const pathname = usePathname();
    const { replace } = useRouter();
    const router = useRouter();
    
    const handleChange = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams);
        if(term !== "") {
            params.set("fromquery", term);
        }else{
            params.delete("fromquery");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    React.useEffect(() => {
        let handler = (e : MouseEvent) => {
            if(!dropdownRef.current?.contains(e.target as Node)){
                const params = new URLSearchParams(searchParams);
                params.delete("fromFocus");
                replace(`${pathname}?${params.toString()}`);
            }
        }
        
        document.addEventListener("mousedown", handler )
    })
    
    function handleFromOnFocus(term: string){
        const params = new URLSearchParams(searchParams);
        params.set("fromquery", term);
        params.delete("toqueryFocus")
        params.set("fromFocus", "true");
        replace(`${pathname}?${params.toString()}`);
    }
    
    // function handleFromOnBlur(){
        //     const params = new URLSearchParams(searchParams);
        //     params.delete("fromFocus");
        //     replace(`${pathname}?${params.toString()}`);
    // }
    
    function fromResultClick(city: string){
        const params = new URLSearchParams(searchParams);
        params.set("fromquery", city)
        params.delete("fromFocus");
        replace(`${pathname}?${params.toString()}`);
        router.refresh();
    }

  return (
    <div>
        <input 
            ref={inputElementRef}
            onChange={(e) => {
                handleChange(e.target.value);
            }}
            onFocus={(e) => {
                handleFromOnFocus(e.target.value);
            }}
            defaultValue={searchParams.get('fromquery')?.toString()}
            
        />
        {
            (searchParams.get("fromFocus")?.toString() as string) && (fromSearchResult.length > 0) && 
            <section
              ref={dropdownRef}
              id="from--suggestion--wrapper"
              className="bg-gray-300 w-56 h-56 overflow-y-auto absolute bottom-[-16rem]"
            >
              <DropDown changeCity={(city : string) =>  fromResultClick(city) } searchResult={fromSearchResult} inputBox={"from"} />
            </section>
        }
    </div>
  )
}
