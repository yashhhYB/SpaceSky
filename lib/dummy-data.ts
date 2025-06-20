// Dummy data for all APIs to ensure everything works smoothly

export interface APODData {
  date: string
  explanation: string
  hdurl?: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export interface NearEarthObject {
  id: string
  name: string
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    close_approach_date: string
    relative_velocity: {
      kilometers_per_hour: string
    }
    miss_distance: {
      kilometers: string
    }
  }>
}

export interface ISSLocation {
  latitude: number
  longitude: number
  timestamp: number
}

export const dummyAPOD: APODData = {
  date: new Date().toISOString().split("T")[0],
  explanation:
    "The Horsehead Nebula is one of the most identifiable nebulae in the sky. Also known as Barnard 33, the unusual shape was first discovered on a photographic plate in the late 1800s. The red glow originates from hydrogen gas predominantly behind the nebula, ionized by the nearby bright star Sigma Orionis. The darkness of the Horsehead is caused mostly by thick dust, although the lower part of the Horsehead's neck casts a shadow to the left.",
  media_type: "image",
  service_version: "v1",
  title: "The Horsehead Nebula in Infrared",
  url: "/placeholder.svg?height=600&width=800",
  hdurl: "/placeholder.svg?height=1200&width=1600",
}

export const dummyNEOs: NearEarthObject[] = [
  {
    id: "2021277",
    name: "277 Elvira",
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 45.8,
        estimated_diameter_max: 102.4,
      },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "2024-07-20",
        relative_velocity: {
          kilometers_per_hour: "54234.5",
        },
        miss_distance: {
          kilometers: "45678901.2",
        },
      },
    ],
  },
  {
    id: "3200",
    name: "3200 Phaethon",
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 4.6,
        estimated_diameter_max: 10.3,
      },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2024-08-15",
        relative_velocity: {
          kilometers_per_hour: "87432.1",
        },
        miss_distance: {
          kilometers: "12345678.9",
        },
      },
    ],
  },
  {
    id: "433",
    name: "433 Eros",
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 16.8,
        estimated_diameter_max: 37.6,
      },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "2024-09-10",
        relative_velocity: {
          kilometers_per_hour: "23456.7",
        },
        miss_distance: {
          kilometers: "23456789.1",
        },
      },
    ],
  },
]

export const generateISSLocation = (): ISSLocation => {
  // Generate realistic ISS coordinates that change over time
  const time = Date.now() / 1000
  const orbitPeriod = 5580 // ISS orbital period in seconds (93 minutes)
  const progress = (time % orbitPeriod) / orbitPeriod

  // Simplified orbital calculation
  const latitude = Math.sin(progress * Math.PI * 2) * 51.6 // ISS inclination is 51.6°
  const longitude = (progress * 360 - 180) % 360
  const adjustedLongitude = longitude > 180 ? longitude - 360 : longitude

  return {
    latitude: latitude + (Math.random() - 0.5) * 2, // Add some variation
    longitude: adjustedLongitude + (Math.random() - 0.5) * 2,
    timestamp: time,
  }
}

export const spaceWeatherData = {
  solarWind: {
    speed: 425 + Math.random() * 100,
    density: 8.2 + Math.random() * 4,
    temperature: 100000 + Math.random() * 50000,
  },
  solarActivity: {
    xrayFlux: "C2.1",
    sunspotNumber: 87 + Math.floor(Math.random() * 50),
    solarFlares: Math.floor(Math.random() * 5),
  },
  geomagneticField: {
    kpIndex: 2.3 + Math.random() * 2,
    auroraActivity: "Low",
    magneticStorm: false,
  },
}

export const marsWeatherData = {
  sol: 4000 + Math.floor(Math.random() * 100),
  season: "Northern Spring",
  minTemp: -80 + Math.random() * 20,
  maxTemp: -20 + Math.random() * 30,
  pressure: 750 + Math.random() * 100,
  windSpeed: 15 + Math.random() * 25,
  windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
}
