"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import { BookOpen, Play, Award, Clock, Star, Users, Download, CheckCircle, Rocket } from "lucide-react"

export default function StudyPage() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const courses = [
    {
      id: 1,
      title: "Introduction to Astronomy",
      description: "Learn the basics of astronomy, from our solar system to distant galaxies",
      level: "Beginner",
      duration: "6 weeks",
      lessons: 24,
      progress: 0,
      rating: 4.8,
      students: 15420,
      topics: ["Solar System", "Stars", "Galaxies", "Telescopes", "Observation Techniques"],
      instructor: "Dr. Sarah Chen",
      price: "Free",
      lessonsList: [
        "Introduction to the Universe",
        "Our Solar System Overview",
        "The Sun: Our Nearest Star",
        "Inner Planets: Mercury & Venus",
        "Earth and Moon System",
        "Mars: The Red Planet",
        "Asteroid Belt and Minor Bodies",
        "Gas Giants: Jupiter & Saturn",
        "Ice Giants: Uranus & Neptune",
        "Dwarf Planets and Kuiper Belt",
        "Comets and Meteors",
        "Stars and Stellar Evolution",
        "Binary and Multiple Star Systems",
        "Star Clusters",
        "Nebulae: Stellar Nurseries",
        "Supernovae and Stellar Death",
        "Black Holes and Neutron Stars",
        "The Milky Way Galaxy",
        "Types of Galaxies",
        "Galaxy Clusters",
        "Dark Matter and Dark Energy",
        "The Big Bang Theory",
        "Cosmic Microwave Background",
        "Future of the Universe",
      ],
    },
    {
      id: 2,
      title: "Planetary Science Deep Dive",
      description: "Explore the formation, composition, and characteristics of planets",
      level: "Intermediate",
      duration: "8 weeks",
      lessons: 32,
      progress: 0,
      rating: 4.9,
      students: 8750,
      topics: ["Planet Formation", "Atmospheres", "Geology", "Moons", "Exoplanets"],
      instructor: "Prof. Michael Rodriguez",
      price: "Free",
      lessonsList: [
        "Planet Formation Theories",
        "Protoplanetary Disks",
        "Terrestrial Planet Formation",
        "Gas Giant Formation",
        "Planetary Atmospheres",
        "Atmospheric Dynamics",
        "Greenhouse Effects",
        "Planetary Geology",
        "Volcanism and Tectonics",
        "Impact Cratering",
        "Planetary Magnetospheres",
        "Moon Formation and Evolution",
        "Tidal Forces",
        "Ring Systems",
        "Exoplanet Detection Methods",
        "Transit Photometry",
        "Radial Velocity Method",
        "Direct Imaging",
        "Habitable Zones",
        "Biosignatures",
        "Atmospheric Characterization",
        "Super-Earths",
        "Hot Jupiters",
        "Rogue Planets",
        "Planetary System Architecture",
        "Migration Theories",
        "Planetary Dynamics",
        "Resonances and Stability",
        "Comparative Planetology",
        "Future Missions",
        "Astrobiology Implications",
        "SETI and Communication",
      ],
    },
    {
      id: 3,
      title: "Astrophotography Masterclass",
      description: "Master the art and science of capturing the night sky",
      level: "Intermediate",
      duration: "10 weeks",
      lessons: 40,
      progress: 0,
      rating: 4.7,
      students: 5230,
      topics: ["Camera Settings", "Equipment", "Processing", "Deep Sky Objects", "Planetary Imaging"],
      instructor: "Emma Thompson",
      price: "Free",
      lessonsList: [
        "Introduction to Astrophotography",
        "Camera Types and Sensors",
        "Lenses and Telescopes",
        "Mounts and Tracking",
        "Essential Accessories",
        "Camera Settings Basics",
        "ISO, Aperture, and Shutter Speed",
        "Manual Focus Techniques",
        "Light Pollution and Dark Sites",
        "Planning Your Shoot",
        "Weather Considerations",
        "Safety and Ethics",
        "Wide-Field Astrophotography",
        "Milky Way Photography",
        "Star Trails",
        "Meteor Shower Photography",
        "Lunar Photography",
        "Planetary Imaging",
        "Solar Photography (Safety)",
        "Deep Sky Object Basics",
        "Nebula Photography",
        "Galaxy Imaging",
        "Star Cluster Photography",
        "Stacking Techniques",
        "Image Calibration",
        "Noise Reduction",
        "Stretching and Enhancement",
        "Color Correction",
        "Sharpening Techniques",
        "Advanced Processing",
        "Software Comparison",
        "Workflow Optimization",
        "Sharing Your Work",
        "Building a Portfolio",
        "Equipment Upgrades",
        "Troubleshooting Common Issues",
        "Advanced Techniques",
        "Time-lapse Astrophotography",
        "Competition and Exhibitions",
        "Future Trends",
      ],
    },
    {
      id: 4,
      title: "Cosmology and the Universe",
      description: "Understand the origin, evolution, and fate of the universe",
      level: "Advanced",
      duration: "12 weeks",
      lessons: 48,
      progress: 0,
      rating: 4.9,
      students: 3420,
      topics: ["Big Bang Theory", "Dark Matter", "Dark Energy", "Cosmic Microwave Background", "Future of Universe"],
      instructor: "Dr. James Wilson",
      price: "Free",
      lessonsList: [
        "Introduction to Cosmology",
        "Historical Perspectives",
        "The Observable Universe",
        "Cosmic Distance Ladder",
        "Hubble's Law and Expansion",
        "The Big Bang Theory",
        "Cosmic Timeline",
        "Nucleosynthesis",
        "Recombination Era",
        "First Stars and Galaxies",
        "Cosmic Microwave Background",
        "CMB Anisotropies",
        "Inflation Theory",
        "Flatness Problem",
        "Horizon Problem",
        "Monopole Problem",
        "Dark Matter Evidence",
        "Dark Matter Candidates",
        "Dark Matter Detection",
        "Dark Energy Discovery",
        "Accelerating Universe",
        "Dark Energy Models",
        "Cosmological Parameters",
        "Standard Model of Cosmology",
        "Alternative Theories",
        "Modified Gravity",
        "Multiverse Theories",
        "Anthropic Principle",
        "Large Scale Structure",
        "Galaxy Formation",
        "Cosmic Web",
        "Void and Filaments",
        "Baryon Acoustic Oscillations",
        "Type Ia Supernovae",
        "Gravitational Lensing",
        "Cosmic Surveys",
        "Future Observations",
        "Heat Death Scenario",
        "Big Rip Theory",
        "Cyclic Models",
        "Quantum Cosmology",
        "String Cosmology",
        "Observational Challenges",
        "Technological Advances",
        "Philosophical Implications",
        "Future of Cosmology",
        "Career Opportunities",
        "Research Methods",
      ],
    },
    {
      id: 5,
      title: "Space Mission Design",
      description: "Learn how to design and plan space missions from concept to execution",
      level: "Advanced",
      duration: "14 weeks",
      lessons: 56,
      progress: 0,
      rating: 4.8,
      students: 2150,
      topics: ["Mission Planning", "Orbital Mechanics", "Spacecraft Design", "Launch Systems", "Mission Operations"],
      instructor: "Dr. Lisa Park",
      price: "Free",
      lessonsList: [
        "Introduction to Space Missions",
        "Mission Objectives and Requirements",
        "Stakeholder Analysis",
        "Mission Architecture",
        "Systems Engineering Approach",
        "Trade Studies",
        "Risk Assessment",
        "Cost Estimation",
        "Orbital Mechanics Fundamentals",
        "Kepler's Laws",
        "Orbital Elements",
        "Orbital Maneuvers",
        "Interplanetary Trajectories",
        "Gravity Assists",
        "Launch Windows",
        "Delta-V Requirements",
        "Spacecraft Subsystems",
        "Power Systems",
        "Propulsion Systems",
        "Attitude Control",
        "Thermal Management",
        "Communications",
        "Data Handling",
        "Structures and Materials",
        "Launch Vehicle Selection",
        "Launch Site Considerations",
        "Payload Integration",
        "Mission Timeline",
        "Ground Segment Design",
        "Mission Control Centers",
        "Deep Space Network",
        "Data Processing",
        "Mission Operations Planning",
        "Contingency Planning",
        "Autonomous Operations",
        "Human Factors",
        "Planetary Protection",
        "Space Debris Mitigation",
        "International Regulations",
        "Technology Readiness Levels",
        "Testing and Validation",
        "Integration and Testing",
        "Launch Operations",
        "Early Operations Phase",
        "Cruise Phase Operations",
        "Science Operations",
        "End of Mission Planning",
        "Mission Success Criteria",
        "Lessons Learned",
        "Future Mission Concepts",
        "Emerging Technologies",
        "Commercial Space",
        "International Cooperation",
        "Career Paths",
        "Project Management",
        "Case Studies",
      ],
    },
    {
      id: 6,
      title: "Astrobiology and Life in the Universe",
      description: "Explore the possibility of life beyond Earth and the search for extraterrestrial intelligence",
      level: "Intermediate",
      duration: "9 weeks",
      lessons: 36,
      progress: 0,
      rating: 4.6,
      students: 6890,
      topics: ["Origin of Life", "Extremophiles", "Habitable Zones", "Biosignatures", "SETI"],
      instructor: "Dr. Maria Santos",
      price: "Free",
      lessonsList: [
        "Introduction to Astrobiology",
        "Definition of Life",
        "Origin of Life on Earth",
        "Miller-Urey Experiment",
        "RNA World Hypothesis",
        "Hydrothermal Vents",
        "Panspermia Theory",
        "Early Earth Conditions",
        "Extremophiles on Earth",
        "Life in Extreme Environments",
        "Thermophiles and Psychrophiles",
        "Acidophiles and Alkaliphiles",
        "Radiation-Resistant Organisms",
        "Deep Subsurface Life",
        "Habitable Zone Concept",
        "Goldilocks Zone",
        "Circumstellar Habitable Zones",
        "Galactic Habitable Zone",
        "Tidal Heating",
        "Subsurface Oceans",
        "Mars Habitability",
        "Europa and Enceladus",
        "Titan's Organic Chemistry",
        "Venus Past Habitability",
        "Exoplanet Habitability",
        "Biosignatures and Biomarkers",
        "Atmospheric Biosignatures",
        "Surface Biosignatures",
        "Technosignatures",
        "SETI History",
        "Drake Equation",
        "Fermi Paradox",
        "Radio SETI",
        "Optical SETI",
        "Future SETI Strategies",
        "Astrobiology Missions",
      ],
    },
  ]

  const resources = [
    {
      title: "NASA's Eyes on the Solar System",
      type: "Interactive Tool",
      description: "3D visualization of NASA missions and solar system exploration",
      link: "#",
      category: "Simulation",
    },
    {
      title: "Stellarium Desktop Planetarium",
      type: "Software",
      description: "Free open-source planetarium software for your computer",
      link: "#",
      category: "Software",
    },
    {
      title: "Astronomy Picture of the Day Archive",
      type: "Image Gallery",
      description: "NASA's collection of stunning space images with explanations",
      link: "#",
      category: "Gallery",
    },
    {
      title: "International Space Station Tracker",
      type: "Live Data",
      description: "Real-time tracking of the ISS and other satellites",
      link: "#",
      category: "Tracking",
    },
    {
      title: "Exoplanet Archive",
      type: "Database",
      description: "Comprehensive database of confirmed exoplanets",
      link: "#",
      category: "Database",
    },
    {
      title: "Space Weather Prediction Center",
      type: "Live Data",
      description: "Real-time space weather conditions and forecasts",
      link: "#",
      category: "Weather",
    },
  ]

  const achievements = [
    { name: "First Steps", description: "Complete your first lesson", icon: "🚀", unlocked: false },
    { name: "Solar System Explorer", description: "Complete Introduction to Astronomy", icon: "🌍", unlocked: false },
    { name: "Stargazer", description: "Complete 10 observation exercises", icon: "⭐", unlocked: false },
    { name: "Planet Hunter", description: "Learn about all planets in our solar system", icon: "🪐", unlocked: false },
    { name: "Deep Space Pioneer", description: "Complete advanced cosmology course", icon: "🌌", unlocked: false },
    { name: "Astrophotographer", description: "Submit your first astrophoto", icon: "📸", unlocked: false },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navigation />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Space Study Hub
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Expand your knowledge of the universe with our comprehensive courses, interactive resources, and
              expert-led content designed for space enthusiasts of all levels.
            </p>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600">
                Courses
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600">
                Resources
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-blue-600">
                Progress
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-blue-600">
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">{course.price}</div>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg group-hover:text-gradient transition-all duration-300">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.lessons} lessons
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          {course.rating}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()} students
                        </div>
                      </div>

                      <div className="text-sm text-gray-400">
                        <strong>Instructor:</strong> {course.instructor}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-500/20 text-blue-400 border-blue-400/30"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-400 border-gray-400/30">
                            +{course.topics.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Course Detail Modal */}
              {selectedCourse && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <Card className="bg-gray-900/95 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl text-white mb-2">{selectedCourse.title}</CardTitle>
                          <CardDescription className="text-gray-300 text-lg">
                            {selectedCourse.description}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedCourse(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-400">{selectedCourse.lessons}</div>
                          <div className="text-sm text-gray-400">Lessons</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">{selectedCourse.duration}</div>
                          <div className="text-sm text-gray-400">Duration</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-yellow-400">{selectedCourse.rating}</div>
                          <div className="text-sm text-gray-400">Rating</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-purple-400">{selectedCourse.price}</div>
                          <div className="text-sm text-gray-400">Price</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Course Lessons</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                          {selectedCourse.lessonsList.map((lesson: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs text-blue-400">
                                {index + 1}
                              </div>
                              <span className="text-gray-300 text-sm">{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => setSelectedCourse(null)}
                        >
                          <Rocket className="mr-2 h-4 w-4" />
                          Start Learning
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          onClick={() => setSelectedCourse(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 group"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                          {resource.category}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-400/30">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg group-hover:text-gradient transition-all duration-300">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-300">{resource.description}</CardDescription>

                      <Button
                        variant="outline"
                        className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transform hover:scale-105 transition-all duration-300"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-400" />
                      Achievements
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Unlock achievements as you progress through your space education journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                            achievement.unlocked
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-gray-800/50 border border-gray-700"
                          }`}
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div
                              className={`font-semibold ${achievement.unlocked ? "text-green-400" : "text-gray-400"}`}
                            >
                              {achievement.name}
                            </div>
                            <div className="text-sm text-gray-500">{achievement.description}</div>
                          </div>
                          {achievement.unlocked && <CheckCircle className="h-5 w-5 text-green-400" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Learning Statistics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your progress and learning milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Overall Progress</span>
                          <span className="text-white">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Courses Completed</span>
                          <span className="text-white">0 / {courses.length}</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Study Streak</span>
                          <span className="text-white">0 days</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">0</div>
                        <div className="text-sm text-gray-400">Hours Studied</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">0</div>
                        <div className="text-sm text-gray-400">Certificates</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Study Community</CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect with fellow space enthusiasts and learners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Community Features Coming Soon</h3>
                    <p className="text-gray-400 mb-6">
                      Join study groups, participate in discussions, and collaborate with other space enthusiasts.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                      Join Waitlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
