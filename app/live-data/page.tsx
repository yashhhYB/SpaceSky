"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import { Satellite, Globe, Thermometer, Wind, Eye, RefreshCw, MapPin, Clock } from "lucide-react"
import { fetchAPOD, fetchNearEarthObjects, fetchISSLocation, fetchSpaceWeather, fetchMarsWeather } from "@/lib/nasa-api"
import type { APODData, NearEarthObject, ISSLocation } from "@/lib/dummy-data"

export default function LiveDataPage() {
  const [issData, setIssData] = useState<ISSLocation | null>(null)
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [neoData, setNeoData] = useState<NearEarthObject[]>([])
  const [spaceWeather, setSpaceWeather] = useState<any>(null)
  const [marsWeather, setMarsWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const loadData = async () => {
    setLoading(true)
    try {
      const [iss, apod, neos, weather, mars] = await Promise.all([
        fetchISSLocation(),
        fetchAPOD(),
        fetchNearEarthObjects(
          new Date().toISOString().split("T")[0],
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        ),
        fetchSpaceWeather(),
        fetchMarsWeather(),
      ])

      setIssData(iss)
      setApodData(apod)
      setNeoData(neos)
      setSpaceWeather(weather)
      setMarsWeather(mars)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // Update ISS position every 10 seconds
    const issInterval = setInterval(async () => {
      try {
        const newIssData = await fetchISSLocation()
        setIssData(newIssData)
      } catch (error) {
        console.warn("Failed to update ISS position:", error)
      }
    }, 10000)

    return () => clearInterval(issInterval)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num))
  }

  const formatDistance = (km: string) => {
    const distance = Number.parseFloat(km)
    if (distance > 1000000) {
      return `${(distance / 1000000).toFixed(2)} million km`
    }
    return `${formatNumber(distance)} km`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live Space Data
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl">
                Real-time information from NASA and space agencies around the world
              </p>
            </div>

            <div className="text-right">
              <Button onClick={loadData} disabled={loading} className="bg-blue-600 hover:bg-blue-700 mb-2">
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
              <div className="text-sm text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</div>
            </div>
          </div>

          <Tabs defaultValue="iss" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="iss" className="data-[state=active]:bg-blue-600">
                ISS Tracker
              </TabsTrigger>
              <TabsTrigger value="apod" className="data-[state=active]:bg-blue-600">
                Picture of the Day
              </TabsTrigger>
              <TabsTrigger value="asteroids" className="data-[state=active]:bg-blue-600">
                Near Earth Objects
              </TabsTrigger>
              <TabsTrigger value="weather" className="data-[state=active]:bg-blue-600">
                Space Weather
              </TabsTrigger>
            </TabsList>

            <TabsContent value="iss" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Satellite className="mr-2 h-5 w-5 text-blue-400" />
                      International Space Station
                    </CardTitle>
                    <CardDescription className="text-gray-400">Live position and orbital data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        <div className="animate-pulse bg-gray-700 h-4 rounded"></div>
                        <div className="animate-pulse bg-gray-700 h-4 rounded w-3/4"></div>
                        <div className="animate-pulse bg-gray-700 h-4 rounded w-1/2"></div>
                      </div>
                    ) : issData ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400">Latitude</div>
                            <div className="text-lg font-bold text-white">{issData.latitude.toFixed(4)}°</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Longitude</div>
                            <div className="text-lg font-bold text-white">{issData.longitude.toFixed(4)}°</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Altitude</div>
                            <div className="text-lg font-bold text-white">408 km</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Velocity</div>
                            <div className="text-lg font-bold text-white">27,600 km/h</div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Clock className="mr-2 h-4 w-4" />
                            Updated: {new Date(issData.timestamp * 1000).toLocaleTimeString()}
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                            Live Tracking Active
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400">Unable to load ISS data</div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-green-400" />
                      ISS Ground Track
                    </CardTitle>
                    <CardDescription className="text-gray-400">Current position over Earth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
                      <div className="text-center z-10">
                        <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                        <div className="text-white font-semibold">Live Earth Map</div>
                        <div className="text-sm text-gray-400">ISS Position Tracking</div>
                        {issData && (
                          <div className="mt-4 text-xs text-gray-300">
                            Currently over: {issData.latitude > 0 ? "N" : "S"}
                            {Math.abs(issData.latitude).toFixed(2)}°, {issData.longitude > 0 ? "E" : "W"}
                            {Math.abs(issData.longitude).toFixed(2)}°
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">ISS Facts & Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Mission Details</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Launched: November 20, 1998</li>
                        <li>• Crew capacity: 6-7 astronauts</li>
                        <li>• Mass: ~420,000 kg</li>
                        <li>• Solar array span: 73m</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Orbital Information</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Orbital period: ~93 minutes</li>
                        <li>• Orbits per day: ~15.5</li>
                        <li>• Inclination: 51.6°</li>
                        <li>• Average altitude: 408 km</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Current Status</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Status: Operational</li>
                        <li>• Next resupply: SpX-31</li>
                        <li>• Crew rotation: Ongoing</li>
                        <li>• Experiments: 200+ active</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apod" className="space-y-6">
              {apodData && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Eye className="mr-2 h-5 w-5 text-purple-400" />
                      Astronomy Picture of the Day
                    </CardTitle>
                    <CardDescription className="text-gray-400">{apodData.date} • NASA APOD</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={apodData.url || "/placeholder.svg"}
                          alt={apodData.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">{apodData.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{apodData.explanation}</p>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                            {apodData.media_type}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                            NASA
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="asteroids" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {neoData.map((neo) => (
                  <Card key={neo.id} className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{neo.name}</CardTitle>
                        {neo.is_potentially_hazardous_asteroid && (
                          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-400/30">
                            ⚠️ Potentially Hazardous
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-gray-400">Near Earth Object #{neo.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Diameter:</span>
                          <div className="text-white font-medium">
                            {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(1)} -{" "}
                            {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(1)} km
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Close Approach:</span>
                          <div className="text-white font-medium">
                            {new Date(neo.close_approach_data[0].close_approach_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Velocity:</span>
                          <div className="text-white font-medium">
                            {formatNumber(
                              Number.parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour),
                            )}{" "}
                            km/h
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Miss Distance:</span>
                          <div className="text-white font-medium">
                            {formatDistance(neo.close_approach_data[0].miss_distance.kilometers)}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-xs text-gray-400">
                          This asteroid will safely pass Earth at a distance of{" "}
                          {formatDistance(neo.close_approach_data[0].miss_distance.kilometers)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="weather" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Wind className="mr-2 h-5 w-5 text-yellow-400" />
                      Solar Wind
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-400">Speed</div>
                        <div className="text-2xl font-bold text-white">
                          {spaceWeather ? Math.round(spaceWeather.solarWind.speed) : 425} km/s
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Density</div>
                        <div className="text-lg text-white">
                          {spaceWeather ? spaceWeather.solarWind.density.toFixed(1) : "8.2"} protons/cm³
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Normal Conditions</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Thermometer className="mr-2 h-5 w-5 text-red-400" />
                      Solar Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-400">X-Ray Flux</div>
                        <div className="text-2xl font-bold text-white">
                          {spaceWeather ? spaceWeather.solarActivity.xrayFlux : "C2.1"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Sunspot Number</div>
                        <div className="text-lg text-white">
                          {spaceWeather ? spaceWeather.solarActivity.sunspotNumber : 87}
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">Moderate Activity</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-green-400" />
                      Geomagnetic Field
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-400">Kp Index</div>
                        <div className="text-2xl font-bold text-white">
                          {spaceWeather ? spaceWeather.geomagneticField.kpIndex.toFixed(1) : "2.3"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Aurora Activity</div>
                        <div className="text-lg text-white">
                          {spaceWeather ? spaceWeather.geomagneticField.auroraActivity : "Low"}
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Quiet Conditions</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {marsWeather && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Mars Weather Report</CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest conditions from Mars Sol {marsWeather.sol}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">Temperature</div>
                        <div className="text-sm text-gray-400 mb-2">High / Low</div>
                        <div className="text-blue-400">
                          {Math.round(marsWeather.maxTemp)}°C / {Math.round(marsWeather.minTemp)}°C
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">Pressure</div>
                        <div className="text-sm text-gray-400 mb-2">Atmospheric</div>
                        <div className="text-green-400">{Math.round(marsWeather.pressure)} Pa</div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">Wind</div>
                        <div className="text-sm text-gray-400 mb-2">Speed & Direction</div>
                        <div className="text-yellow-400">
                          {Math.round(marsWeather.windSpeed)} m/s {marsWeather.windDirection}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">Season</div>
                        <div className="text-sm text-gray-400 mb-2">Mars Year</div>
                        <div className="text-purple-400">{marsWeather.season}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
