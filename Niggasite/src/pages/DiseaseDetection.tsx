
import { useState } from "react";
import { Upload, FileImage, BarChart, Leaf, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    disease: string;
    confidence: number;
    description: string;
    treatment: string[];
    prevention: string[];
  }>(null);

  // Mock data - In a real app, this would come from API
  const mockResults = {
    disease: "Late Blight",
    confidence: 92,
    description: "Late blight is a disease that affects potatoes and tomatoes. It is caused by the oomycete pathogen Phytophthora infestans. The disease spreads quickly in wet weather and can destroy large areas of crops within days.",
    treatment: [
      "Remove and destroy infected plants",
      "Apply copper-based fungicides",
      "Improve air circulation between plants",
      "Keep foliage dry by watering at the base of plants"
    ],
    prevention: [
      "Use resistant varieties",
      "Ensure proper spacing between plants",
      "Rotate crops every season",
      "Keep garden free of plant debris"
    ]
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Plant Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload images of plant leaves to identify diseases and get treatment recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Upload className="mr-2 h-5 w-5" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Select a clear image of the affected plant part for best results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 mb-4">
              {previewUrl ? (
                <div className="relative w-full">
                  <img 
                    src={previewUrl} 
                    alt="Selected plant" 
                    className="mx-auto max-h-[300px] rounded-lg object-contain" 
                  />
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                      setResults(null);
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="mb-4 text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </p>
                  <Label 
                    htmlFor="image-upload" 
                    className="cursor-pointer bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Select Image
                  </Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            
            <Button 
              className="w-full" 
              onClick={analyzeImage} 
              disabled={!selectedImage || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Image"}
            </Button>
            
            {isAnalyzing && <Progress value={45} className="mt-4" />}
          </CardContent>
        </Card>
        
        <Card className={`${results ? '' : 'opacity-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart className="mr-2 h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              {results ? "Disease identified with detailed information" : "Upload and analyze an image to see results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{results.disease}</h3>
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {results.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {results.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center mb-2">
                    <Leaf className="h-4 w-4 mr-2" />
                    Treatment Recommendations
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {results.treatment.map((item, index) => (
                      <li key={index} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold flex items-center mb-2">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Prevention Methods
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {results.prevention.map((item, index) => (
                      <li key={index} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Analysis results will appear here after processing
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
