'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function FromSearch() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams);
        if(params.get("toquery")){
            params.delete("toquery")
        }
        if(term !== "") {
            params.set("fromquery", term);
        }else{
            params.delete("fromquery");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    function handleFocus(){
        
    }

  return (
    <input 
        type="text" 
        onChange={(e) => {
            handleChange(e.target.value);
        }}
        onFocus={() => {
            handleFocus()
        }}
    />
  )
}
