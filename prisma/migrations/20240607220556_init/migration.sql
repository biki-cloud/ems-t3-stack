-- CreateTable
CREATE TABLE "EventParticipationRequest" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventParticipationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventParticipationRequest" ADD CONSTRAINT "EventParticipationRequest_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipationRequest" ADD CONSTRAINT "EventParticipationRequest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
