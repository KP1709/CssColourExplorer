# CSS Colour Explorer
[![Netlify Status](https://api.netlify.com/api/v1/badges/44a72302-dc3c-4fd2-81aa-f70087a65074/deploy-status)](https://app.netlify.com/sites/kareenapatel-csscolourexplorer/deploys)


## ⌨️ Tech stack
React / CSS / Typescript / Vite / React (Tanstack) Query / Axios / React Router

## 🍼 Introduction
Similar to the Colour Scheme Generator project, I wanted to explore React Query but in Typescript. The difference is, the user can select a colour and is taken to a unique page displaying information about it including HSL, HSV and CMYK codes. React Query was used along with two different APIs to obtain all the information about the selected colour. Dependent queries were used as the second API relied on some data from the first API. Similar to the Colour Names Explorer, the user can search by colour name as see the results based on their search in real-time.

## 🛠️ Features
- Able to search for colours by name
- View more information about the colour by clicking / tapping
    - User taken to a page with the colour name within the URL
    - Displays colour and information about it
- Error and loading handling 
- Responsive design for mobile and desktop
- Applied accessibility practices as best as possible

## 📚 Resources
- Colour Names Explorer - https://github.com/KP1709/ColourNameExplorer
- Colour Scheme Generator - https://github.com/KP1709/ColourSchemeGenerator
- CSS color REST API - https://www.csscolorsapi.com
    - Used to get all colours
    - Used to get information about a specific colour
- The color API - https://www.thecolorapi.com/
    - Used to get additional information about the colour which the other API didn't provide

## 🤖 AI Assistance
I found out that Lodash had individual library packages for some of their functionalities. This meant the whole Lodash didn't need to be imported. However I did struggle in understanding how to import and use it in this project. Therefore I used V0 by Vercel to help educate me 😊.  

Phrase entered: "how to use the loaddash.startcase npm package in react"  
Looking at the example code provided, I was able to work it out and import any addtional @types which were required.