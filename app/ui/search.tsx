"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if(term) params.set("query", term);
    else params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div id="search--wrapper">
      <input
        type="text"
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
    </div>
  );
}
