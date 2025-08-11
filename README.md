# 🗺️ AI Trip Planner

An AI-powered trip planning web app that generates personalized travel itineraries based on your preferences.  
Built with **React**, deployed on **Vercel**, and integrated with AI APIs for itinerary generation.

## 🚀 Live Demo
🔗 [AI Trip Planner – Live Site](https://ai-trip-planner-plum.vercel.app/)

---

## 📌 Features
- **AI-Generated Trips** – Get complete itineraries based on destination, budget, and trip duration.
- **Dynamic Hotel & Place Images** – Fetched using Unsplash API.
- **Google Maps Integration** – Quick access to location details and directions.
- **Responsive Design** – Optimized for desktop and mobile use.
- **Smooth Routing** – Single-page application with React Router.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Firebase
- **Routing:** React Router
- **APIs:** Pexels API, Google Maps, Openrouter API
- **Hosting:** Vercel

---

## ⚠️ Deployment Notes
When hosting React apps with client-side routing on Vercel, refreshing on a nested route may cause a **404 error** because the server looks for that path directly.  
To fix this, add the following in `vercel.json` to rewrite all routes to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
