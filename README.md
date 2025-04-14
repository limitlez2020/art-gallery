# Collart 🎨 

A digital art gallery for college students to showcase, upload, and even generate AI-powered artworks. Built as part of the weekly challenge, this app serves as a creative hub for art lovers who want to explore, contribute, or create art on the go.

---

## 📌 Project Overview

**Collart** is a full-stack web application that allows users to:

- View a dynamic gallery of submitted artworks.
- Upload and showcase their own art.
- Generate custom digital art using AI (Gemini API) by simply entering a creative prompt.

This project has been in development for about 4 weeks and is now live and functional, offering users a smooth and interactive experience to engage with art.

---

## ✨ Features

- **🖼️ View Artworks**  
  Explore a live gallery of digital artworks submitted by students.  
  Artwork is sorted by recency, making sure the newest pieces are always front and center.

- **📤 Upload Your Art**  
  Users can upload their own artwork by submitting an image along with relevant details (artist name, title, style, etc.).  
  The image is stored in **Supabase Storage**, and the artwork details are saved in the **PostgreSQL** database.

- **🧠 Generate AI Art**  
  Users can describe the kind of art they want to see, and Gemini AI will generate a custom artwork based on their description.  
  The image is processed, stored, and automatically added to the gallery with all the details intact.

- **🔁 API-Powered Backend**  
  **Next.js API Routes** are used to handle all data interactions—uploading, generating, and fetching artwork.  
  API routes streamline backend logic and keep everything within a single full-stack project.

---

## 🧱 Technologies Used

### Frontend

- **Next.js** – Server-side rendering & routing.
- **React** – Modular, component-based UI.
- **Tailwind CSS** – Utility-first responsive styling.
- **Heroicons** – Icon set for UI.
- **ShadcnUI & Aceternity UI** – Prebuilt, accessible UI components.

### Backend & Database

- **Supabase** – PostgreSQL database, authentication, and file storage.
- **PostgreSQL** – Stores artwork metadata and user info.
- **Gemini AI API** – Generates AI art from user descriptions.
- **Next.js API Routes** – Handles server-side logic and integrates with Supabase and Gemini AI.

### Deployment

- **Vercel** – Fast, serverless hosting optimized for Next.js.
- **GitHub** – Source control and collaboration.

---

## 🚀 Usage

**Live Demo**: [https://lnkd.in/e3XH57w6](https://lnkd.in/e3XH57w6)  
**GitHub Repository**: [https://lnkd.in/eZuQBJr3](https://lnkd.in/eZuQBJr3)

- **Explore the Gallery**: Visit the homepage to view artworks created or uploaded by users.
- **Upload Your Artwork**: Submit your art image along with its details via the upload form.
- **Generate AI Art**: Input a description of what you'd like to see, and watch the AI bring it to life. The resulting artwork is saved and added to the gallery automatically.

---

## 🔧 How It Works (Behind the Scenes)

1. **Gallery Display**  
   Artworks are fetched from Supabase using a database query and sorted by timestamp to show the latest first.

2. **Artwork Upload**  
   Image is saved to Supabase Storage → Public URL is created → Artwork details + URL saved in PostgreSQL.

3. **AI Art Generation**  
   User submits a description → Sent to Gemini API → Returns base64 image → Converted to file → Stored in Supabase → Metadata saved to DB → Displayed in gallery.

4. **Next.js API Routes**  
   API endpoints handle interactions between frontend and backend, including uploading, fetching, and generating art.

---

## Known Problems to Fix

The way the AI images upload is a bit inefficient
- When the user geenerates an image using AI, we store the image in the supabase storage and then get a publicUrl which we use to display it so the user sees the image they generated. 
- The issue is, if the user chooses to regenerate the image, we repeat the process above, but the image that we initially genrated will still be stored in the supabase storage
- To fix this, whenever the user clicks upload in the "generate" section, we want to remove the images from the storage whose publicUrl is not being used in the supabase database itself.

---

## 🌱 Future Improvements

- **🔐 User Authentication**  
  Enable users to log in, manage uploads, and view their personal gallery.

- **🔍 Search & Filters**  
  Add functionality to search by artist, category, or keywords.

- **❤️ Like & Save**  
  Let users engage with artworks by liking and saving their favorites.

- **🌓 Dark Mode & UI Enhancements**  
  Improve accessibility and visual design across devices.

- **🎨 Themed AI Prompts**  
  Offer one-click generation based on predefined art styles or themes.

---

Made with 💖 for creatives everywhere.