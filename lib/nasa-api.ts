// Enhanced NASA API integration with proper fallbacks
import { dummyAPOD, dummyNEOs, generateISSLocation, spaceWeatherData, marsWeatherData } from "./dummy-data"
import type { APODData, NearEarthObject, ISSLocation } from "./dummy-data"

const NASA_API_KEY = "hWo05SEBbpypHVKT5mfpH1GmAoos7upLzYZ1c6yL"
const NASA_BASE_URL = "https://api.nasa.gov"

// Fetch Astronomy Picture of the Day with fallback
export async function fetchAPOD(date?: string): Promise<APODData> {
  try {
    const url = new URL(`${NASA_BASE_URL}/planetary/apod`)
    url.searchParams.append("api_key", NASA_API_KEY)
    if (date) {
      url.searchParams.append("date", date)
    }

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error("Failed to fetch APOD data")
    }

    return await response.json()
  } catch (error) {
    console.warn("APOD API error, using fallback data:", error)
    return dummyAPOD
  }
}

// Fetch Near Earth Objects with fallback
export async function fetchNearEarthObjects(startDate: string, endDate: string): Promise<NearEarthObject[]> {
  try {
    const url = new URL(`${NASA_BASE_URL}/neo/rest/v1/feed`)
    url.searchParams.append("start_date", startDate)
    url.searchParams.append("end_date", endDate)
    url.searchParams.append("api_key", NASA_API_KEY)

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error("Failed to fetch NEO data")
    }

    const data = await response.json()
    const objects: NearEarthObject[] = []

    Object.values(data.near_earth_objects).forEach((dayObjects: any) => {
      objects.push(...dayObjects)
    })

    return objects.slice(0, 10)
  } catch (error) {
    console.warn("NEO API error, using fallback data:", error)
    return dummyNEOs
  }
}

// Fetch ISS Current Location with fallback
export async function fetchISSLocation(): Promise<ISSLocation> {
  try {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
    if (!response.ok) {
      throw new Error("Failed to fetch ISS location")
    }

    const data = await response.json()
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: data.timestamp,
    }
  } catch (error) {
    console.warn("ISS API error, using generated data:", error)
    return generateISSLocation()
  }
}

// Get space weather data (simulated)
export async function fetchSpaceWeather() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return spaceWeatherData
}

// Get Mars weather data (simulated)
export async function fetchMarsWeather() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return marsWeatherData
}

// Fetch ISS Pass Times for a location
export async function fetchISSPassTimes(lat: number, lon: number, alt = 0, n = 5) {
  try {
    const url = new URL("https://api.wheretheiss.at/v1/satellites/25544/passes")
    url.searchParams.append("lat", lat.toString())
    url.searchParams.append("lon", lon.toString())
    url.searchParams.append("alt", alt.toString())
    url.searchParams.append("limit", n.toString())

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error("Failed to fetch ISS pass times")
    }

    const data = await response.json()
    return data.passes.map((pass: any) => ({
      risetime: new Date(pass.risetime * 1000),
      duration: pass.duration,
    }))
  } catch (error) {
    console.warn("ISS pass times API error:", error)
    return []
  }
}
