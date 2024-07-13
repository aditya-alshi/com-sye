import { fetchFilteredResults } from "../lib/data"

export default async function Suggestion({query}: {query : string}){
    
    const allCities = await fetchFilteredResults(query)
    const renderedCities = allCities.map((city, index) => (
        <div key={index} >
            <p>{city.cityName}</p>
        </div>
    ))
    return(
        <div id="suggestion--wrapper" className="p-0.6rem h-[20rem] w-[18rem] bg-white overflow-auto">
            {renderedCities}
        </div>
    )
}