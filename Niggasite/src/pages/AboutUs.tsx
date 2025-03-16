
import { Award, Leaf, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About FarmAI</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing agriculture through technology and innovation
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mb-20">
        <div className="bg-muted/30 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            At FarmAI, we're dedicated to transforming traditional farming through innovative 
            technology solutions. Our mission is to empower farmers with accessible, AI-driven 
            tools that enhance productivity, sustainability, and profitability.
          </p>
          <p className="text-muted-foreground">
            We believe that by combining cutting-edge artificial intelligence with agricultural 
            expertise, we can help solve some of the most pressing challenges facing modern farming.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="glass-card animate-fade-in">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainable Farming</h3>
            <p className="text-muted-foreground">
              Our technologies promote sustainable agricultural practices, 
              reducing waste and environmental impact.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "150ms" }}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cutting-Edge Innovation</h3>
            <p className="text-muted-foreground">
              We continuously develop and improve our AI solutions to address 
              evolving agricultural challenges.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Farmer-Focused</h3>
            <p className="text-muted-foreground">
              Our solutions are designed with real farmers' needs in mind, making 
              advanced technology accessible to all.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
        <p className="text-muted-foreground mb-4">
          FarmAI was founded by a team of agricultural experts and technology innovators who 
          recognized the potential for AI to revolutionize farming practices. What began as a 
          simple idea has grown into a comprehensive suite of tools that farmers around the 
          world rely on every day.
        </p>
        <p className="text-muted-foreground">
          Today, we continue to expand our offerings and improve our technology, always guided 
          by our commitment to making farming more efficient, sustainable, and profitable.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
