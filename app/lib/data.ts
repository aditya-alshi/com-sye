import { revalidatePath } from "next/cache";
import prisma from "./db";
import { notFound } from "next/navigation";

// Source function will take destination station as agrument to exclude it from the results. 
export async function getFromStations(term : string) {
  try {
    if(term) {
      const filteredCity = await prisma.city.findMany({
          where: {
            cityName: {
              contains: term
            }
      },
        })
        return filteredCity;
    }
    
  } catch(error) {
    notFound()
  }
}



export async function submitFormData(formData: FormData) {
  console.log(formData);
  try{
    if(formData) {
      
      const fromCity = formData.get("fromStation") as string
      const toCity = formData.get("toStation") as string
      const bookedForDate = formData.get("booking-for-date") as string

      const addBookingInformation = await prisma.bookingInformation.create({
        data: {
          fromCity : fromCity,
          toCity : toCity,
          bookedForDate : bookedForDate
        },
      })
      revalidatePath("/")
    }
  } catch(error) {
    console.log(error)
  }
  
}