import { revalidatePath } from "next/cache";
import prisma from "./db";
import { notFound } from "next/navigation";

// Source function will take destination station as agrument to exclude it from the results. 
export async function getFromStations(term: string) {
  try {
    if (term) {
      const filteredCity = await prisma.city.findMany({
        where: {
          cityName: {
            contains: term
          }
        },
      })
      return filteredCity;
    }

  } catch (error) {
    notFound()
  }
}

export async function submitFormData(formData: FormData) {
  try {
    if (formData) {
      const fromCity = formData.get("fromCity") as string
      const toCity = formData.get("toCity") as string
      const bookedForDate = formData.get("booking-for-date") as string

      const addBookingInformation = await prisma.bookingInformation.create({
        data: {
          fromCity: fromCity,
          toCity: toCity,
          bookedForDate: bookedForDate
        },
      })
      revalidatePath('/')
      return addBookingInformation;
    }
  } catch (error) {
    console.log(error)
  }
}

export default async function getallBooking() {
  try {
    const allBookings = await prisma.bookingInformation.findMany();
    return allBookings;
  } catch (error) {
    console.log(error);
  }
}