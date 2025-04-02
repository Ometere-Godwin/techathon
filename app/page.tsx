"use client"

import type { JSX } from "react";
import React, { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Users,
  Palette,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/components/ui/use-toast";

// Icon wrapper to prevent hydration issues
interface IconWrapperProps {
  icon: React.ComponentType<any>;
  className?: string;
  strokeWidth?: number;
}

const IconWrapper = ({ icon: Icon, ...props }: IconWrapperProps) => {
  return <Icon {...props} style={{}} />;
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const targetDateStr = localStorage.getItem("countdownTarget");
      let newTargetDate;

      if (!targetDateStr) {
        // Set initial target date (29 days from now)
        newTargetDate = new Date();
        newTargetDate.setHours(0, 0, 0, 0); // Reset to midnight
        newTargetDate.setDate(newTargetDate.getDate() + 29); // Add 29 days
        localStorage.setItem("countdownTarget", newTargetDate.toISOString());
      } else {
        newTargetDate = new Date(targetDateStr);
      }
      setTargetDate(newTargetDate);
    }
  }, []);

  const calculateTimeLeft = () => {
    if (!targetDate) {
      return { days: 29, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update initial time left when target date changes
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft && Object.values(newTimeLeft).every((v) => v === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]); // Add targetDate as dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful submission
    setIsSubmitted(true);
    toast({
      title: "Registration Successful!",
      description: "Please proceed to payment to secure your spot.",
    });
  };

  const handlePayment = async () => {
    // Here you would integrate with your payment provider (e.g., Paystack, Flutterwave)
    // For now, we'll just show a toast
    toast({
      title: "Redirecting to payment...",
      description: "You will be redirected to our secure payment page.",
    });
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80",
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="sticky top-0 z-50">
          {/* Countdown Timer */}
          <div className="bg-purple-900 text-white py-3">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <span className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">
                  Registration Closes In:
                </span>
                <div className="grid grid-cols-4 sm:flex gap-2 sm:gap-3">
                  <div className="bg-purple-800 px-2 sm:px-3 py-1 rounded">
                    <span className="text-lg sm:text-xl font-bold">
                      {timeLeft?.days ?? 0}
                    </span>
                    <span className="text-xs sm:text-sm ml-1">days</span>
                  </div>
                  <div className="bg-purple-800 px-2 sm:px-3 py-1 rounded">
                    <span className="text-lg sm:text-xl font-bold">
                      {timeLeft?.hours ?? 0}
                    </span>
                    <span className="text-xs sm:text-sm ml-1">hrs</span>
                  </div>
                  <div className="bg-purple-800 px-2 sm:px-3 py-1 rounded">
                    <span className="text-lg sm:text-xl font-bold">
                      {timeLeft?.minutes ?? 0}
                    </span>
                    <span className="text-xs sm:text-sm ml-1">min</span>
                  </div>
                  <div className="bg-purple-800 px-2 sm:px-3 py-1 rounded">
                    <span className="text-lg sm:text-xl font-bold">
                      {timeLeft?.seconds ?? 0}
                    </span>
                    <span className="text-xs sm:text-sm ml-1">sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Online Learning Badge */}
          <div className="bg-purple-100 py-2">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-purple-900">
                <IconWrapper icon={Globe} className="w-5 h-5" />
                <span className="font-medium">
                  100% Online Learning - Study from Anywhere in Lagos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[600px]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full"
          >
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Students learning ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce-slow uppercase tracking-wider">
                SKILLUP TECHATHON 2025
              </h1>
              <p className="text-xl md:text-xl text-white mb-4 max-w-2xl mx-auto">
                Transform your future with our interactive Frontend & UI/UX program!
              </p>
              {/* <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                <IconWrapper icon={Globe} className="inline-block w-5 h-5 mr-2" />
                Fully online classes with live mentorship and hands-on projects
              </p> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white text-lg rounded-md px-8 py-6">
                    Register Now - ₦80,000 Only!
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Register for Techathon</DialogTitle>
                  </DialogHeader>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          min="14"
                          max="21"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Submit Application
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4 mt-4">
                      <div className="text-center pb-4">
                        <div className="text-2xl text-green-600 mb-2">✓</div>
                        <h3 className="text-xl font-semibold mb-2">
                          Registration Complete!
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Thank you for registering for Techathon 2025.
                        </p>
                      </div>
                      <Button
                        onClick={handlePayment}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Proceed to Payment - ₦80,000
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 px-4 relative overflow-hidden" id="features">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">
              Why Choose Our Techathon?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 text-center feature-card relative">
                <IconWrapper
                  icon={Code2}
                  className="w-12 h-12 mx-auto mb-4 text-purple-600 feature-icon"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-2 feature-title">
                  Practical Learning
                </h3>
                <p className="text-gray-600">
                  Learn by building real projects with modern technologies
                </p>
              </Card>
              <Card className="p-6 text-center feature-card relative">
                <IconWrapper
                  icon={Users}
                  className="w-12 h-12 mx-auto mb-4 text-purple-600 feature-icon"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-2 feature-title">
                  Expert Mentorship
                </h3>
                <p className="text-gray-600">
                  Get guidance from industry professionals
                </p>
              </Card>
              <Card className="p-6 text-center feature-card relative">
                <IconWrapper
                  icon={BookOpen}
                  className="w-12 h-12 mx-auto mb-4 text-purple-600 feature-icon"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-2 feature-title">
                  Comprehensive Curriculum
                </h3>
                <p className="text-gray-600">
                  From basics to advanced concepts in both tracks
                </p>
              </Card>
              <Card className="p-6 text-center feature-card relative">
                <IconWrapper
                  icon={GraduationCap}
                  className="w-12 h-12 mx-auto mb-4 text-purple-600 feature-icon"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-2 feature-title">
                  Career Ready
                </h3>
                <p className="text-gray-600">
                  Graduate with a portfolio and job-ready skills
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="bg-purple-50 py-20 px-4" id="tracks">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">
              Program Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Frontend Development Track */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
                  alt="Frontend Development"
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <IconWrapper
                      icon={Code2}
                      className="w-8 h-8 text-purple-600 mr-3"
                    />
                    <h3 className="text-2xl font-bold text-purple-900">
                      Frontend Development Track
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        Course Duration
                      </h4>
                      <p className="text-gray-700">3 months intensive training</p>
                      <p className="text-purple-600 mt-1">
                        <IconWrapper
                          icon={Globe}
                          className="inline-block w-4 h-4 mr-1"
                        />
                        Fully Online - Live Interactive Sessions
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        What You&apos;ll Learn
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>HTML5, CSS3, and Modern JavaScript</li>
                        <li>React.js and Next.js</li>
                        <li>Responsive Web Design</li>
                        <li>Version Control with Git</li>
                        <li>Web Performance Optimization</li>
                        <li>API Integration</li>
                        <li>State Management</li>
                        <li>Testing and Debugging</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        Career Outcomes
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Frontend Developer</li>
                        <li>React Developer</li>
                        <li>Web Application Developer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI/UX Design Track */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80"
                  alt="UI/UX Design"
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <IconWrapper
                      icon={Palette}
                      className="w-8 h-8 text-purple-600 mr-3"
                    />
                    <h3 className="text-2xl font-bold text-purple-900">
                      UI/UX Design Track
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        Course Duration
                      </h4>
                      <p className="text-gray-700">3 months intensive training</p>
                      <p className="text-purple-600 mt-1">
                        <IconWrapper
                          icon={Globe}
                          className="inline-block w-4 h-4 mr-1"
                        />
                        Fully Online - Live Interactive Sessions
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        What You&apos;ll Learn
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Design Principles and Theory</li>
                        <li>User Research and Personas</li>
                        <li>Wireframing and Prototyping</li>
                        <li>Figma and Design Tools</li>
                        <li>User Interface Design</li>
                        <li>User Experience Design</li>
                        <li>Design Systems</li>
                        <li>Usability Testing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-900 mb-2">
                        Career Outcomes
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>UI Designer</li>
                        <li>UX Designer</li>
                        <li>Product Designer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 text-center mt-8">
                <p className="text-xl text-purple-900 mb-4">
                  Special Offer: ₦80,000 instead of ₦320,000
                </p>
                <p className="text-gray-700">
                  Limited time offer for Secondary School graduates and JAMB
                  candidates in Lagos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Orientation Event Section */}
        <section
          className="bg-gradient-to-r from-purple-900 to-purple-700 py-16 px-4"
          id="orientation"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
                Onboarding and Orientation Event
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <IconWrapper
                      icon={MapPin}
                      className="w-8 h-8 text-purple-600"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900">
                        Venue
                      </h3>
                      <p className="text-gray-700">University of Lagos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <IconWrapper
                      icon={Calendar}
                      className="w-8 h-8 text-purple-600"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900">
                        Important Dates
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>Orientation: May 31st, 2025</li>
                        <li>Classes Begin: June 2nd, 2025</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-purple-200 rounded-full p-1 mr-3 mt-1">
                        <IconWrapper
                          icon={Users}
                          className="w-4 h-4 text-purple-700"
                        />
                      </span>
                      Meet your instructors and fellow students
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-200 rounded-full p-1 mr-3 mt-1">
                        <IconWrapper
                          icon={BookOpen}
                          className="w-4 h-4 text-purple-700"
                        />
                      </span>
                      Program overview and curriculum walkthrough
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-200 rounded-full p-1 mr-3 mt-1">
                        <IconWrapper
                          icon={Globe}
                          className="w-4 h-4 text-purple-700"
                        />
                      </span>
                      Online learning platform orientation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-purple-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p>Email: info@skilluptechathon.com</p>
                <p>Phone: +234 800 123 4567</p>
                <p>Location: Lagos, Nigeria</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-purple-300">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-300">
                      Curriculum
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-300">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-purple-300">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-purple-300">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-purple-300">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-purple-800 text-center">
              <p>&copy; 2024 SkillUp Techathon. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
      <Toaster />
    </>
  );
}
