'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams);
        if(term !== "") {
            params.set("toquery", term);
        }else{
            params.delete("toquery");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    function handleFromOnFocus(){
        const params = new URLSearchParams(searchParams);
        params.delete("fromFocus");
        params.set("toqueryFocus", "focus");
        replace(`${pathname}?${params.toString()}`);
    }

    function handleFromOnBlur(){
        const params = new URLSearchParams(searchParams);
        params.delete("toqueryFocus");
        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <input 
        onChange={(e) => {
            handleChange(e.target.value);
        }}
        defaultValue={searchParams.get('toquery')?.toString()}
        onFocus={() => {
            handleFromOnFocus();
        }}
        onBlur={() => {
            handleFromOnBlur();
        }}
    />
  )
}
