
// import { SlCalender } from "react-icons/sl";
// import { GoArrowSwitch } from "react-icons/go";


import { getFromStations } from "./lib/data";


import Form from "./components/Form";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const filteredFromCities = await getFromStations(
    searchParams?.fromStation as string
  );
  const filteredToCities = await getFromStations(
    searchParams?.toStation as string
  );

  return (
    <Form fromStation={filteredFromCities || []} toStation={filteredToCities || []}/>
  );
}
