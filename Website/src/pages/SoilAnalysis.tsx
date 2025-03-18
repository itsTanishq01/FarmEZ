
import { useState } from "react";
import { Leaf, Droplet, Thermometer, Braces, BarChart3, CloudRain, Sun, Wind, MoveHorizontal, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SoilAnalysis = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data - In a real app, this would come from sensors/API
  const soilData = {
    texture: "Clay Loam",
    moisture: 68,
    bulkDensity: 1.28,
    porosity: 52,
    waterHoldingCapacity: 65,
    ph: 6.8,
    electricalConductivity: 0.8,
    organicCarbon: 1.85,
    nitrogen: 75,
    phosphorus: 45,
    potassium: 62,
    sulfur: 18,
    calcium: 1250,
    magnesium: 420,
    temperature: 24,
    rainfall: 85,
    humidity: 72,
    solarRadiation: 520
  };
  
  const recommendedCrops = [
    { name: "Wheat", suitability: 95, icon: "🌾" },
    { name: "Rice", suitability: 80, icon: "🌾" },
    { name: "Corn", suitability: 78, icon: "🌽" },
    { name: "Soybeans", suitability: 65, icon: "🌱" },
    { name: "Potatoes", suitability: 60, icon: "🥔" },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Soil Health & Crop Suggestions</h1>
        <p className="text-muted-foreground">IoT and AI insights for optimal soil health and crop selection</p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="dashboard">Soil Dashboard</TabsTrigger>
          <TabsTrigger value="recommendations">Crop Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Physical Properties */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Mountain className="mr-2 h-5 w-5 text-orange-500" />
                  Soil Texture
                </CardTitle>
                <CardDescription>Physical composition of soil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{soilData.texture}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Ideal for water retention and nutrient holding
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                  Soil Moisture
                </CardTitle>
                <CardDescription>Current water content in soil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.moisture}%</div>
                <Progress value={soilData.moisture} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.moisture > 60 ? "Optimal" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MoveHorizontal className="mr-2 h-5 w-5 text-slate-500" />
                  Bulk Density
                </CardTitle>
                <CardDescription>Soil compaction measure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.bulkDensity} g/cm³</div>
                <Progress value={(soilData.bulkDensity / 2) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.bulkDensity < 1.4 ? "Good" : "Compacted"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Wind className="mr-2 h-5 w-5 text-cyan-500" />
                  Porosity
                </CardTitle>
                <CardDescription>Space for air and water</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.porosity}%</div>
                <Progress value={soilData.porosity} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.porosity > 50 ? "Good" : "Needs improvement"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Droplet className="mr-2 h-5 w-5 text-indigo-500" />
                  Water Holding Capacity
                </CardTitle>
                <CardDescription>Ability to retain water</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.waterHoldingCapacity}%</div>
                <Progress value={soilData.waterHoldingCapacity} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.waterHoldingCapacity > 60 ? "Excellent" : "Average"}
                </p>
              </CardContent>
            </Card>
            
            {/* Chemical Properties */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Braces className="mr-2 h-5 w-5 text-purple-500" />
                  Soil pH
                </CardTitle>
                <CardDescription>Acidity/alkalinity level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.ph}</div>
                <Progress value={(soilData.ph / 14) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.ph > 6 && soilData.ph < 7.5 ? "Optimal" : "Needs adjustment"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Braces className="mr-2 h-5 w-5 text-amber-500" />
                  Electrical Conductivity
                </CardTitle>
                <CardDescription>Salt content measure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.electricalConductivity} dS/m</div>
                <Progress value={(soilData.electricalConductivity / 4) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.electricalConductivity < 1.0 ? "Safe" : "Watch for salt stress"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-emerald-500" />
                  Organic Carbon
                </CardTitle>
                <CardDescription>Soil organic matter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.organicCarbon}%</div>
                <Progress value={(soilData.organicCarbon / 4) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.organicCarbon > 1.5 ? "Good" : "Add organic matter"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-green-500" />
                  Nitrogen (N)
                </CardTitle>
                <CardDescription>Essential for plant growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.nitrogen} mg/kg</div>
                <Progress value={(soilData.nitrogen / 100) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.nitrogen > 70 ? "Optimal" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-orange-500" />
                  Phosphorus (P)
                </CardTitle>
                <CardDescription>Important for root development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.phosphorus} mg/kg</div>
                <Progress value={(soilData.phosphorus / 100) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.phosphorus > 50 ? "Optimal" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-yellow-500" />
                  Potassium (K)
                </CardTitle>
                <CardDescription>Enhances plant resilience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.potassium} mg/kg</div>
                <Progress value={(soilData.potassium / 100) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.potassium > 60 ? "Optimal" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-yellow-300" />
                  Sulfur (S)
                </CardTitle>
                <CardDescription>Secondary nutrient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.sulfur} mg/kg</div>
                <Progress value={(soilData.sulfur / 30) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.sulfur > 15 ? "Adequate" : "Low"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-gray-400" />
                  Calcium (Ca)
                </CardTitle>
                <CardDescription>Secondary nutrient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.calcium} mg/kg</div>
                <Progress value={(soilData.calcium / 2000) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.calcium > 1000 ? "Adequate" : "Low"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-green-300" />
                  Magnesium (Mg)
                </CardTitle>
                <CardDescription>Secondary nutrient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.magnesium} mg/kg</div>
                <Progress value={(soilData.magnesium / 500) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.magnesium > 400 ? "Adequate" : "Low"}
                </p>
              </CardContent>
            </Card>
            
            {/* Environmental Factors */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Thermometer className="mr-2 h-5 w-5 text-red-500" />
                  Soil Temperature
                </CardTitle>
                <CardDescription>Current soil temperature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.temperature}°C</div>
                <Progress value={(soilData.temperature / 40) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.temperature > 18 && soilData.temperature < 28 ? "Optimal" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <CloudRain className="mr-2 h-5 w-5 text-blue-400" />
                  Rainfall
                </CardTitle>
                <CardDescription>Recent precipitation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.rainfall} mm</div>
                <Progress value={(soilData.rainfall / 150) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.rainfall > 60 && soilData.rainfall < 120 ? "Adequate" : "Monitor irrigation"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Wind className="mr-2 h-5 w-5 text-blue-300" />
                  Humidity
                </CardTitle>
                <CardDescription>Atmospheric moisture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.humidity}%</div>
                <Progress value={soilData.humidity} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.humidity > 60 && soilData.humidity < 80 ? "Good" : "Extreme"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Sun className="mr-2 h-5 w-5 text-yellow-400" />
                  Solar Radiation
                </CardTitle>
                <CardDescription>Sunlight intensity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{soilData.solarRadiation} W/m²</div>
                <Progress value={(soilData.solarRadiation / 1000) * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: {soilData.solarRadiation > 400 ? "High" : "Moderate"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 glass-card p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Soil Health Summary</h3>
            <p className="mb-4">
              Your soil is currently in {soilData.moisture > 60 && soilData.nitrogen > 70 ? "good" : "moderate"} health. 
              Based on the analysis, we recommend the following actions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Maintain current irrigation schedule to keep moisture levels optimal</li>
              <li>Consider adding nitrogen-rich fertilizer to improve nitrogen levels</li>
              <li>Monitor soil temperature as it approaches the upper optimal range</li>
              <li>Add compost to improve overall soil structure and nutrient retention</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="animate-fade-in">
          <div className="glass-card p-6 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <BarChart3 className="mr-2 h-5 w-5" />
              <h3 className="text-xl font-bold">Crop Suitability Analysis</h3>
            </div>
            <p className="mb-4">
              Based on your current soil conditions, climate data, and historical performance, 
              we've analyzed the suitability of various crops for your land. 
              The following recommendations are personalized for optimal yield.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCrops.map((crop, index) => (
              <Card key={index} className={`border-l-4 ${
                crop.suitability > 90 ? 'border-l-green-500' : 
                crop.suitability > 75 ? 'border-l-blue-500' : 
                crop.suitability > 60 ? 'border-l-yellow-500' : 'border-l-gray-500'
              }`}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <span className="mr-2 text-xl">{crop.icon}</span>
                    {crop.name}
                  </CardTitle>
                  <CardDescription>Suitability score: {crop.suitability}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={crop.suitability} className="mb-2" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Optimal Planting:</p>
                      <p className="text-muted-foreground">Mid-Spring</p>
                    </div>
                    <div>
                      <p className="font-medium">Estimated Yield:</p>
                      <p className="text-muted-foreground">{Math.round(crop.suitability / 10)} tons/acre</p>
                    </div>
                    <div>
                      <p className="font-medium">Water Needs:</p>
                      <p className="text-muted-foreground">
                        {crop.suitability > 80 ? 'Medium' : 'High'}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Growth Period:</p>
                      <p className="text-muted-foreground">
                        {Math.round(100 + Math.random() * 50)} days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button className="mt-8">
            Generate Detailed Crop Report
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SoilAnalysis;
