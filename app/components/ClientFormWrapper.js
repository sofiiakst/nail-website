"use client"; // Makes this component client-side

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./Form"; // Import your existing server-side Form component

import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import Spinner from "./Spinner";
import { payUpfront } from "../lib/payUpfront";
import UserForm from "./UserForm";

export default function ClientFormWrapper({ extras, datatype, data, tech }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const greekPhoneRegex = /^(69\d{8}|2\d{9})$/;

  function handlePhoneChange(phone) {
    setPhone(phone);
  }

  function handleNameChange(name) {
    setFullName(name);
  }

  // Handle form submission
  useEffect(() => {
    console.log("Selected Date in Wrapper:", selectedDate);
    console.log("Selected Time in Wrapper:", selectedTime);

    if (submitStatus === "submitting") {
      if (!selectedDate || !selectedTime) {
        console.error("Date or time is missing.");
        setSubmitStatus("error");
        alert("Please select both a date and a time.");
        return;
      }

      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // Month is 0-indexed, so add 1 to get the correct month
        const day = selectedDate.getDate();
        const hour = selectedTime.padStart(2, "0"); // Ensure time is in two digits (e.g., "03")

        // Format the date and time into an ISO-compliant string
        const appointmentDateTimeString = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour}:00:00Z`;

        // Output the formatted date and time string
        console.log(
          "Constructed Appointment DateTime String:",
          appointmentDateTimeString
        );

        // Create a Date object using the formatted string
        const appointmentDateTime = new Date(appointmentDateTimeString);

        // Check if the date is valid
        if (isNaN(appointmentDateTime.getTime())) {
          console.error("Invalid date or time value");
          throw new Error("Invalid date or time value");
        }
        // Convert to ISO format
        const appointmentDateTimeISO = appointmentDateTime.toISOString();
        console.log(
          "Appointment DateTime in ISO format:",
          appointmentDateTimeISO
        );

        const moveToQuery = async () => {
          try {
            const query = new URLSearchParams({
              serviceName: selectedService.name,
              servicePrice: payUpfront(selectedService.price),
              extrasPrice: selectedExtra.price,
              totalServicePrice: selectedService.price,
              techName: selectedTech.name,
              phone: phone,
              image: image ? image.name : "",
              appointmentDateTime: appointmentDateTimeISO,
              fullName: fullName,
            }).toString();

            setSubmitStatus("success");
            router.push(`/checkout2?${query}`);
          } catch (error) {
            console.error("Error moving to checkout:", error);
            setSubmitStatus("error");
            alert("Cant go to checkout. Please try again.");
          }
        };

        moveToQuery();
      } catch (error) {
        console.error("Error constructing appointment date:", error);
        alert("Invalid date or time selected. Please try again.");
        setSubmitStatus("error");
      }
    }
  }, [submitStatus, selectedDate, selectedTime]);

  const handleSubmit = () => {
    // Greek Phone Number Format Validation
    if (!greekPhoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return; // Prevent form submission
    }

    if (
      selectedService &&
      phone &&
      fullName &&
      selectedTech &&
      selectedDate &&
      selectedTime
    ) {
      setSubmitStatus("submitting"); // Triggers useEffect to submit form
    } else {
      alert("Παρακαλω εισαγετε εγκυρα στοιχεια.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-auto border border-primary-200 text-accent-400 lg:h-screen bg-primary-100">
        <div className="flex flex-col lg:flex-row ">
          <Suspense fallback={<Spinner />}>
            <div className="flex flex-col h-1/2">
              <Form
                datatype={datatype}
                data={data}
                tech={tech}
                extras={extras}
                onServiceChange={setSelectedService}
                onExtraChange={setSelectedExtra}
                onTechChange={setSelectedTech}
                onImageChange={setImage}
                onNameChange={setFullName}
              />
            </div>

            <div className="flex flex-col lg:ml-44 lg:mr-44">
              {selectedService && selectedTech ? (
                <>
                  <DateSelector onSelectDate={setSelectedDate} />
                </>
              ) : (
                <div className="bg-white lg:mt-32 px-4 py-4 rounded-lg">
                  <h1 className="text-primary-600 font-bold text-center text-xl max-w-1/2 mt-7 px-7 py-10 ">
                    Start by selecting both a service and a technician to
                    proceed.
                  </h1>
                </div>
              )}
              {selectedDate ? (
                <TimeSelector
                  onSelectTime={setSelectedTime}
                  selectedTech={selectedTech}
                  selectedDate={selectedDate}
                />
              ) : null}
            </div>
          </Suspense>
        </div>

        <div className="sm:space-y-4 sm:flex sm:flex-col sm:items-center">
          {selectedService && selectedTech && selectedDate && selectedTime ? (
            <UserForm
              onPhoneChange={handlePhoneChange}
              onNameChange={handleNameChange}
              onButtonClick={handleSubmit}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
