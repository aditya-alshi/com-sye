import { fetchFilteredResults } from "../lib/data"
import DropDown from "./DropDown";

export default async function ToSearchResults({
    toquery
}: {
    toquery: string
}
) {
    const searchResult = await fetchFilteredResults(toquery);
    const renderResults = searchResult.map(city => (
        <div key={city.cityId}>{city.cityName}</div>
    ))
    return (
        <div>
            {/* <DropDown searchResult={searchResult} inputBox={"to"}/> */}
        </div>
    )
}