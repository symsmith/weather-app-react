# Weather App

This is a Weather App built using [React](https://reactjs.org/) and the [OpenWeatherMap API](https://openweathermap.org/) (which freely offers to students their Developer API plan).

It is based off of [this design](https://dribbble.com/shots/10460680-Weather-App) by [Anton Mikhaltsov](https://dribbble.com/mikhaltsov23).

The app is live (hosted by [Vercel](https://vercel.com)) [here](https://weather-sym.vercel.app).

## Installation

Clone the repository, and add a file named `.env.local` in the root of the project. Add an OpenWeatherMap [API key](https://openweathermap.org/price) inside as an environment variable like so:

```sh
REACT_APP_API_KEY=yourapikey
```

Inside the directory, run

```sh
> npm install
> npm start
```

and head to `http://localhost:3000`. You're all set!

## Details

This part offers more detail about the features of the application.

### Geolocation

The app geolocates the device upon user agreement and uses it to directly display local weather information. This is done using Javascript's own `navigator.geolocation` API.

If the user blocks geolocation, the app defaults to Paris.

### Weather API(s)

The app uses several OpenWeatherMap APIs:

- [Current Weather Data](https://openweathermap.org/current) to fetch data on the current weather situation: temperature, pressure, sunrise and sunset times, humidity, …
- [One Call API](https://openweathermap.org/api/one-call-api) to fetch data about the next 24 hours and the next 7 days
- [Air Pollution API](https://openweathermap.org/api/air-pollution) to fetch data about the current air quality.

### Search input

The app offers a search input to search any city. If the city cannot be found, the app simply displays a small error notification.

### Architecture

The `src` directory contains the `index.js` file, which is the entry point for the app. This file calls the `App` component, which contains the logic for the geolocation and fetching the current weather data. The component architecture is then as follows:

```
.
└── components
    ├── Content                   Right side of the app
    │   ├── DetailList              Daily/hourly forecast
    │   │   └── Detail
    │   │       ├── Day               Single day card
    │   │       └── Hour              Single hour card
    │   └── Highlights              "Highlights" section
    │       └── BaseHighlight
    │           ├── BaseHighlight     Base highlight card
    │           └── SunHighlight       Specific sunrise/set card
    └── Sidebar                   Left side of the app
        └── SearchInput             City search input
```

The other directories are `assets`, which contain the sunrise, sunset and "compass" icons (used for displaying wind direction) and `utils`, which contains utilitary functions and the `Notification` component used to display the "City not found" error.

### Design

The CSS part is done using [Tailwind CSS](https://tailwindcss.com/) to speed up development. The app uses Flexbox and CSS Grids to easily allow a completely responsive experience.

The fonts used are [Poppins](https://fonts.google.com/specimen/Poppins) and [Inter](https://fonts.google.com/specimen/Inter), served by [Google Fonts](https://fonts.google.com/).
