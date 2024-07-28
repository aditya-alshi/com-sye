-- CreateTable
CREATE TABLE "BookingInformation" (
    "booking_id" TEXT NOT NULL,
    "from_city" VARCHAR(255) NOT NULL,
    "to_city" VARCHAR(255) NOT NULL,
    "booked_for_date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingInformation_pkey" PRIMARY KEY ("booking_id")
);
