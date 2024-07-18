'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term : string) => {
        console.log('used');
        const params = new URLSearchParams(searchParams);
        if(params.get("fromquery")){
            params.delete("fromquery")
        }
        if(term !== "") {
            params.set("toquery", term);
        }else{
            params.delete("toquery");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

  return (
    <input 
        onChange={(e) => {
            handleChange(e.target.value);
        }}
        defaultValue={searchParams.get('toquery')?.toString()}
    />
  )
}
