import { fetchFilteredResults } from "../lib/data"
import DropDown from "./DropDown";

export default async function FromSearchResults({
    fromquery
} : {
    fromquery: string
} 
) {
    const searchResult = await fetchFilteredResults(fromquery) ;
    
    return (
        <div>
            <DropDown searchResult={searchResult}  inputBox={"from"}/>
        </div>
    )
}