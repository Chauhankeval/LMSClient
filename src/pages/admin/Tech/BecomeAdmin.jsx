import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { cn } from "@/lib/utils"; // Utility for conditional Tailwind classes
import { Progress } from "@/components/ui/progress"; // Shadcn Progress Bar
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAddInstructorDataMutation } from "@/Features/api/authApi";
import { toast } from "sonner";

const steps = [
  {
    id: 1,
    title: "Share Your Knowledge",
    question: "What kind of teaching have you done before?",
    options: [
      "In person, informally",
      "In person, professionally",
      "Online",
      "Other",
    ],
  },
  {
    id: 2,
    title: "Choose Your Level",
    question: "How much of a video “pro” are you?",
    options: [
      "I'm a beginner",
      "I have some knowledge",
      "I'm experienced",
      "I have videos ready to upload",
    ],
  },
  {
    id: 3,
    title: "Choose a Course Topic",
    question: "What topic will you teach?",
    options: ["Programming", "Design", "Marketing", "Other"],
  },
  {
    id: 4,
    title: "Build Your Course",
    question: "How do you want to build your course?",
    options: ["Video lessons", "Quizzes", "Assignments", "Live sessions"],
  },
  {
    id: 5,
    title: "About Social Media",
    question: "Do you have an audience to share your course with?",
    options: [
      "Not at the moment",
      "I have a small following",
      "I have a sizeable following",
    ],
  },
];

const BecomeAdmin = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate(); // Hook for navigation

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]); // Store structured data

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const [addInstructorData, { data, isLoading, isSuccess }] =
    useAddInstructorDataMutation();

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Step: Log answers and navigate
      const payload = {
        user: user?.name,
        answers,
      };
      console.log("<< user?.name", payload);
      await addInstructorData(payload);

      navigate(`/tech-credencial/${user?._id}`); // Replace '/dashboard' with your desired route
    }
  };
  useEffect(() => {
    if (isSuccess) {
      
      toast.success(data.message);
    }
  }, [isSuccess]);

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = {
      question: steps[currentStep].question,
      answer: option,
    };
    setAnswers(updatedAnswers);
  };

  return (
    <div className="max-w-lg md:max-w-[80%] mx-auto my-10 p-6 border rounded-md shadow-lg">
      {/* Progress Bar */}
      <Progress value={progressPercentage} className="mb-6" />

      {/* Step Title */}
      <h2 className="text-2xl font-semibold mb-4">
        {steps[currentStep].title}
      </h2>

      {/* Question */}
      <p className="text-lg mb-4">{steps[currentStep].question}</p>

      {/* Options */}
      <div className="space-y-3">
        {steps[currentStep].options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "border rounded-md p-3 cursor-pointer hover:bg-gray-100 hover:text-black transition",
              answers[currentStep]?.answer === option
                ? "bg-blue-100 border-blue-500"
                : ""
            )}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        )}
        <Button onClick={nextStep}>
          {currentStep === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default BecomeAdmin;
