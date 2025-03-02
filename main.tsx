"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Check, Clock, Train } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Train {
  id: number
  number: string
  departureTime: string
  arrivalTime: string
  availableSeats: number[]
  price: number
  duration: string
}

export default function TrainTicketBooking() {
  const [step, setStep] = useState(1)
  const [departureStation, setDepartureStation] = useState("")
  const [arrivalStation, setArrivalStation] = useState("")
  const [travelDate, setTravelDate] = useState("")
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [passengerName, setPassengerName] = useState("")
  const [passengerEmail, setPassengerEmail] = useState("")

  const trains: Train[] = [
    {
      id: 1,
      number: "Express 123",
      departureTime: "10:00 AM",
      arrivalTime: "12:00 PM",
      availableSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      price: 25,
      duration: "2h 0m",
    },
    {
      id: 2,
      number: "Rapid 456",
      departureTime: "01:00 PM",
      arrivalTime: "03:30 PM",
      availableSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      price: 18,
      duration: "2h 30m",
    },
    {
      id: 3,
      number: "Bullet 789",
      departureTime: "04:30 PM",
      arrivalTime: "06:00 PM",
      availableSeats: [3, 4, 5, 8, 9, 12, 13, 14],
      price: 32,
      duration: "1h 30m",
    },
  ]

  const handleTrainSearch = () => {
    setStep(2)
  }

  const handleTrainSelection = (train: Train) => {
    setSelectedTrain(train)
    setStep(3)
  }

  const handleSeatSelection = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const handleBookingConfirmation = () => {
    setIsBookingConfirmed(true)
    setStep(5)
  }

  const handlePayment = () => {
    setStep(4)
  }

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {["Search", "Select Train", "Choose Seats", "Payment", "Confirmation"].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index + 1 <= step ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                  ${
                    index + 1 < step
                      ? "bg-primary text-primary-foreground"
                      : index + 1 === step
                        ? "border-2 border-primary"
                        : "border-2 border-muted"
                  }`}
              >
                {index + 1 < step ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step - 1) * 25}%` }}
          />
        </div>
      </div>
    )
  }

  const renderSearchForm = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Find Your Train</CardTitle>
          <CardDescription>Enter your journey details to search for available trains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="departure-station">From</Label>
              <Select onValueChange={setDepartureStation} defaultValue={departureStation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select departure station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="boston">Boston</SelectItem>
                  <SelectItem value="washington">Washington DC</SelectItem>
                  <SelectItem value="philadelphia">Philadelphia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrival-station">To</Label>
              <Select onValueChange={setArrivalStation} defaultValue={arrivalStation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select arrival station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travel-date">Travel Date</Label>
              <div className="relative">
                <Input
                  id="travel-date"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleTrainSearch}
            className="w-full md:w-auto ml-auto"
            disabled={!departureStation || !arrivalStation || !travelDate}
          >
            Search Trains <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderTrainSelection = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Available Trains</CardTitle>
          <CardDescription>
            {departureStation && arrivalStation ? (
              <>
                From <span className="font-medium">{departureStation}</span> to{" "}
                <span className="font-medium">{arrivalStation}</span> on{" "}
                <span className="font-medium">{new Date(travelDate).toLocaleDateString()}</span>
              </>
            ) : (
              "Select your preferred train from the options below"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trains.map((train) => (
              <div
                key={train.id}
                className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => handleTrainSelection(train)}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Train className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{train.number}</h3>
                      <p className="text-muted-foreground text-sm">{train.availableSeats.length} seats available</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-center">
                      <p className="font-bold">{train.departureTime}</p>
                      <p className="text-xs text-muted-foreground">Departure</p>
                    </div>

                    <div className="hidden md:flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="w-20 h-0.5 bg-primary"></div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>

                    <div className="text-center">
                      <p className="font-bold">{train.arrivalTime}</p>
                      <p className="text-xs text-muted-foreground">Arrival</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <Badge variant="outline" className="mb-1">
                        <Clock className="mr-1 h-3 w-3" /> {train.duration}
                      </Badge>
                      <p className="font-bold text-primary">${train.price}</p>
                    </div>

                    <Button className="w-full md:w-auto">Select</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => setStep(1)} className="mr-auto">
            Back to Search
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderSeatSelection = () => {
    if (!selectedTrain) return null

    // Create a grid of 5 seats per row
    const rows = Math.ceil(selectedTrain.availableSeats.length / 5)
    const seatGrid = Array.from({ length: rows }, (_, rowIndex) =>
      selectedTrain.availableSeats.slice(rowIndex * 5, rowIndex * 5 + 5),
    )

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Select Your Seats</CardTitle>
          <CardDescription>
            Train {selectedTrain.number} • {selectedTrain.departureTime} to {selectedTrain.arrivalTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-1/2 h-10 bg-muted rounded-t-xl flex items-center justify-center border-b-4 border-primary">
                Driver's Cabin
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border">
              {seatGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-4 gap-4">
                  {row.map((seat) => {
                    const isSelected = selectedSeats.includes(seat)
                    return (
                      <button
                        key={seat}
                        onClick={() => handleSeatSelection(seat)}
                        className={`w-12 h-12 rounded-md flex items-center justify-center transition-all
                          ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-background border hover:border-primary"
                          }`}
                      >
                        {seat}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-background border rounded-sm mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary rounded-sm mr-2"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-muted rounded-sm mr-2"></div>
                <span className="text-sm">Occupied</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>Train:</div>
              <div className="font-medium">{selectedTrain.number}</div>

              <div>Departure:</div>
              <div className="font-medium">{selectedTrain.departureTime}</div>

              <div>Arrival:</div>
              <div className="font-medium">{selectedTrain.arrivalTime}</div>

              <div>Selected Seats:</div>
              <div className="font-medium">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}</div>

              <div>Price per seat:</div>
              <div className="font-medium">${selectedTrain.price}</div>

              <Separator className="col-span-2 my-2" />

              <div>Total Price:</div>
              <div className="font-bold">${selectedSeats.length * selectedTrain.price}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button onClick={handlePayment} disabled={selectedSeats.length === 0}>
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderPaymentForm = () => {
    if (!selectedTrain) return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Details</CardTitle>
          <CardDescription>Complete your booking by providing payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="passenger-name">Full Name</Label>
              <Input
                id="passenger-name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passenger-email">Email</Label>
              <Input
                id="passenger-email"
                type="email"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
          </div>

          <div className="mt-8 border rounded-lg p-4">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Train:</div>
              <div className="font-medium">{selectedTrain.number}</div>

              <div>Journey:</div>
              <div className="font-medium">
                {departureStation} to {arrivalStation}
              </div>

              <div>Date:</div>
              <div className="font-medium">{new Date(travelDate).toLocaleDateString()}</div>

              <div>Time:</div>
              <div className="font-medium">
                {selectedTrain.departureTime} - {selectedTrain.arrivalTime}
              </div>

              <div>Selected Seats:</div>
              <div className="font-medium">{selectedSeats.join(", ")}</div>

              <Separator className="col-span-2 my-2" />

              <div>Total Price:</div>
              <div className="font-bold">${selectedSeats.length * selectedTrain.price}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(3)}>
            Back
          </Button>
          <Button onClick={handleBookingConfirmation} disabled={!passengerName || !passengerEmail}>
            Confirm and Pay
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderBookingConfirmation = () => {
    if (!selectedTrain) return null

    const bookingNumber = `TB${Math.floor(100000 + Math.random() * 900000)}`

    return (
      <Card className="border-green-200">
        <CardHeader className="bg-green-50 rounded-t-lg border-b border-green-100">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-green-700">Booking Confirmed!</CardTitle>
          <CardDescription className="text-center text-green-600">
            Your train tickets have been successfully booked
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-medium mb-1">Booking Reference</h3>
            <p className="text-2xl font-bold tracking-wider">{bookingNumber}</p>
            <p className="text-sm text-muted-foreground mt-1">A confirmation email has been sent to {passengerEmail}</p>
          </div>

          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-4 flex items-center">
              <Train className="mr-2 h-5 w-5" /> Journey Details
            </h3>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="text-muted-foreground">Train:</div>
              <div className="font-medium">{selectedTrain.number}</div>

              <div className="text-muted-foreground">From:</div>
              <div className="font-medium">{departureStation}</div>

              <div className="text-muted-foreground">To:</div>
              <div className="font-medium">{arrivalStation}</div>

              <div className="text-muted-foreground">Date:</div>
              <div className="font-medium">{new Date(travelDate).toLocaleDateString()}</div>

              <div className="text-muted-foreground">Departure:</div>
              <div className="font-medium">{selectedTrain.departureTime}</div>

              <div className="text-muted-foreground">Arrival:</div>
              <div className="font-medium">{selectedTrain.arrivalTime}</div>

              <div className="text-muted-foreground">Duration:</div>
              <div className="font-medium">{selectedTrain.duration}</div>

              <div className="text-muted-foreground">Passenger:</div>
              <div className="font-medium">{passengerName}</div>

              <div className="text-muted-foreground">Seats:</div>
              <div className="font-medium">{selectedSeats.join(", ")}</div>

              <Separator className="col-span-2 my-2" />

              <div className="text-muted-foreground">Total Paid:</div>
              <div className="font-bold">${selectedSeats.length * selectedTrain.price}</div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-2">Important Information</h3>
            <ul className="text-sm space-y-2">
              <li>Please arrive at the station at least 30 minutes before departure.</li>
              <li>Have your booking reference and ID ready for verification.</li>
              <li>Luggage allowance: 2 bags per passenger (max 20kg each).</li>
              <li>
                For any changes to your booking, please contact customer service at least 24 hours before departure.
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setStep(1)
              setDepartureStation("")
              setArrivalStation("")
              setTravelDate("")
              setSelectedTrain(null)
              setSelectedSeats([])
              setIsBookingConfirmed(false)
              setPassengerName("")
              setPassengerEmail("")
            }}
          >
            Book Another Ticket
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">Train Ticket Booking</h1>
      <p className="text-muted-foreground text-center mb-8">Book your journey with ease and comfort</p>

      {renderProgressBar()}

      {step === 1 && renderSearchForm()}
      {step === 2 && renderTrainSelection()}
      {step === 3 && renderSeatSelection()}
      {step === 4 && renderPaymentForm()}
      {step === 5 && renderBookingConfirmation()}
    </div>
  )
}

