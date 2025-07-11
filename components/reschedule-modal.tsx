"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Generate time slots for the next 7 days
const generateTimeSlots = () => {
  const days = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
    const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    // Generate random available slots
    const slots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 30]) {
        // Randomly determine if slot is available (70% chance)
        const isAvailable = Math.random() < 0.7

        if (isAvailable) {
          const timeString = `${hour}:${minute === 0 ? "00" : minute}`
          slots.push({
            time: timeString,
            available: true,
          })
        }
      }
    }

    days.push({
      date: date,
      dayName,
      monthDay,
      slots,
    })
  }

  return days
}

interface RescheduleModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentId: string
  appointmentDetails: {
    service: string
    date: string
    time: string
    staff: string
  }
  onReschedule: (appointmentId: string, newDate: Date, newTime: string) => void
}

export function RescheduleModal({
  isOpen,
  onClose,
  appointmentId,
  appointmentDetails,
  onReschedule,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const timeSlots = generateTimeSlots()

  // Find the index of the selected date in the timeSlots array
  const selectedDateIndex = timeSlots.findIndex((day) => day.date.toDateString() === selectedDate.toDateString())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time)
  }

  const handleReschedule = () => {
    if (selectedSlot) {
      onReschedule(appointmentId, selectedDate, selectedSlot)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            You're rescheduling your {appointmentDetails.service} appointment. Please select a new date and time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Select Date</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(selectedDate.getDate() - 1)
                  handleDateChange(newDate)
                }}
                disabled={selectedDateIndex <= 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(selectedDate.getDate() + 1)
                  handleDateChange(newDate)
                }}
                disabled={selectedDateIndex >= timeSlots.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {timeSlots.map((day) => (
              <Button
                key={day.monthDay}
                variant={day.date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
                className={`flex flex-col h-auto py-2 ${
                  day.date.toDateString() === selectedDate.toDateString() ? "bg-[#008080] hover:bg-[#008080]/90" : ""
                }`}
                onClick={() => handleDateChange(day.date)}
              >
                <span className="text-xs">{day.dayName}</span>
                <span className="text-sm font-semibold">{day.monthDay}</span>
              </Button>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
            {selectedDateIndex >= 0 && timeSlots[selectedDateIndex].slots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots[selectedDateIndex].slots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    className={`${selectedSlot === slot.time ? "bg-[#008080] hover:bg-[#008080]/90" : ""}`}
                    onClick={() => handleSlotSelect(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No available slots for this date.</p>
            )}
          </div>

          <div className="bg-[#F0F0F0] p-4 rounded-md">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#008080] mt-0.5" />
              <div>
                <h4 className="font-medium">Current Appointment</h4>
                <p>
                  {appointmentDetails.date} at {appointmentDetails.time}
                </p>
                <p className="text-sm text-gray-500">with {appointmentDetails.staff}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
            disabled={!selectedSlot}
            onClick={handleReschedule}
          >
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
