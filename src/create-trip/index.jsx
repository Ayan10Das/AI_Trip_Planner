import React, { use, useEffect, useState } from 'react'
import LocationAutocomplete from '@/components/LocationAutoComplete'
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { generateTripPlan } from '@/components/services/Openrouter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AiOutlineLoading } from "react-icons/ai";
import { FaGoogle } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/components/services/firebase';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigator = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData]);

  const handlePlaceSelect = (place) => {
    // console.log(place);
    setSelectedPlace(place);
    handleInputChange('Destination', place.display_name)
  }


  const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response)
      // setOpenDialog(false)
    },
    onError: (error) => console.log(error)
  });

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'Application/json'
      }
    })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        genarateTripCheck();
        
        setTimeout(()=>{

          window.location.reload();
        },1000)

      })
      .catch((err) => alert('Login failed! please try again'))
  }

  const genarateTripCheck = async () => {

    const loggedIn = localStorage.getItem('user');
    if (!loggedIn) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfDays || !formData?.Destination || !formData?.traveler || !formData?.budget) {
      toast("Please fill all the details properly!");
      // console.log(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
      return;
    }
    if (formData?.noOfDays > 7) {
      toast("Please do not provide the days more than 7");
      // console.log(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
      return;
    }


    setLoading(true);
    let prompt = `You are a travel planning API. Generate a travel plan in **strict JSON** format only.

**Instructions**:
- Location: ${formData.Destination}
- Duration: ${formData.noOfDays} days
- Travelers: ${formData.traveler}
- Budget: ${formData.budget}
- Use the destination-specific currency **ISO code** (e.g., "JPY", "INR")
- Return only plain numbers for prices (no symbols)
- Respond in valid JSON format ONLY — no markdown, no explanation , no other thing that may hinder to parse it as json.

**Required structure**:

{
  "currency": "INR",
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Hotel Address",
      "price": 12000,
      "currency": "INR",
      "image": "https://...",
      "coordinates": { "lat": ..., "lng": ... },
      "rating": 4.5,
      "description": "..."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "place": "Gateway of India",
          "details": "Historic arch monument.",
          "image": "https://...",
          "coordinates": { "lat": ..., "lng": ... },
          "ticket_price": 100,
          "rating": 4.7,
          "best_time": "Morning",
          "travel_time_minutes": 20
        }
      ]
    }
  ]
}
`
    try {
      // console.log(prompt)
      const rawData = await generateTripPlan(prompt);

      let parsedData;

      if (typeof rawData === 'string') {
        const cleaned = rawData
          .replace(/^```json/, '')
          .replace(/^```/, '')
          .replace(/```$/, '')
          .trim();

        parsedData = JSON.parse(cleaned);
      } else {
        parsedData = rawData; // Already an object
      }

      saveAiTripPlan(parsedData);
      setLoading(false);
      console.log("🎯 Trip Plan:", parsedData);

    } catch (err) {
      toast("Failed to generate trip plan, please try again!.");
      setLoading(false)
      console.error(err);
    }
  }

  const saveAiTripPlan = async (tripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AI_Trips", docId), { // doc(db,collection_name,document_name(string/Unique))
      userSelection: formData,
      TripData: tripData,
      user: JSON.parse(localStorage.getItem("user"))?.email,
      docId: docId
    });
    setLoading(false);
    toast("Trip is generated!");
    navigator('/view-trip/' + docId)
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-60 xl:px-75 px-5 mt-5'>
      <h2 className='font-bold text-3xl '>Tell us your travel preferences ✈️</h2>
      <p className='mt-3 text-gray-600 text-xl'>
        Just provide some basic information and our trip planner will provide customized itinerary-based on your preferences.
      </p>

      <div className='mt-12 flex flex-col gap-3'>
        <div >
          <h2 className='text-xl mt-3 font-medium px-2'>What is your destintion of choice?</h2>
          {/* <div className='border rounded shadow-xl w-[770px] h-[50px]'>  */}
          <LocationAutocomplete onSelect={handlePlaceSelect} />

          {/* </div> */}
        </div>

        <div>
          <h2 className='text-xl mt-3 mb-2 font-medium px-2'>How many days are you planning for th trip?</h2>
          <Input
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value)
            }}
            placeholder={'Ex:3'}
            type="number" />
        </div>

      </div>

      <div className='mt-10 px-2'>
        <h2 className='text-2xl font-medium my-3'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-3 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              className={`p-4 border shadow-lg cursor-pointer rounded-lg hover:shadow-2xl ${formData?.budget == item.title && 'transition delay-50 duration-150 ease-in-out shadow-lg border-black scale-105 -translate-y-1'}`}
              onClick={() => {
                handleInputChange("budget", item.title)
              }}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-gray-700'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 px-2'>
        <h2 className='text-2xl font-medium my-3'>Who do you want to travel with?</h2>
        <div className='grid grid-cols-3 gap-3 mt-5'>
          {SelectTravelersList.map((item, index) => (
            <div key={index}
              className={`p-4 border shadow-lg cursor-pointer rounded-lg hover:shadow-2xl ${formData?.traveler == item.people && 'transition delay-50 duration-150 ease-in-out shadow-lg border-black scale-3d -translate-y-1'}`}
              onClick={() => {
                handleInputChange("traveler", item.people)
              }}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-gray-700'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-end p-2 mt-5'>
        <Button
          disabled={loading}
          className='hover:bg-amber-500 hover:text-black'
          onClick={genarateTripCheck}>
          {loading ? <AiOutlineLoading className='h-8 w-8 animate-spin' /> : "Genarate Trip"}
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
            <DialogDescription>

              <img src="/logo.svg" className='h-22 w-55 ml-22' />
              <h2 className='font-bold text-lg mt-2'>Sign In with Google</h2>
              <p>Sign In with Google authentication securely!</p>
              <Button
                className='w-full mt-5 gap-3 items-center'
                onClick={login}
              >
                <FaGoogle className='h-7 w-7' />Sign In</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

      </Dialog>

    </div>
  )
}

export default CreateTrip