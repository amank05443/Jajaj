import React from "react";
import { motion } from "framer-motion";

const StepProgress = ({ steps = [], currentStep = 0 }) => {
    console.log("steps:",steps);
    console.log("currentStep:",currentStep);
  const totalSteps = steps.length;
  const progressPercent1 =
    totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;
    const progressPercent = progressPercent1 < 1 ? 6 : progressPercent1;
  return (
    <div className="relative px-4">
      <div className="flex items-center" style={{ position: "relative" }}>
        <div
          className={`absolute h-1 bg-gray-300`}
          style={{ top: "20px", zIndex: 1, left: 0, right: 0 }}
        />
        <motion.div
          className={`absolute h-1 bg-gradient-to-r from-blue-400 to-blue-600`}
          style={{ top: "20px", zIndex: 1, left: 0, borderRadius:"0 4px 4px 0" }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease:'easeOut' }}
        />

        <div className="flex justify-between w-full">
          {steps.map((step, index) => {
            const isCurrent = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex flex-col justify-between items-center">
                <div
                  className={`w-10 h-10 ml-1 flex items-center justify-center rounded-full border-2 bg-white ${
                    isCompleted
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isCurrent
                        ? "border-green-500"
                        : "border-gray-400 text-gray-400"
                  } ${!isCompleted && !isCurrent ? "hover:bg-gray-100 hover:border-gray-500":""}`}
                  style={{ zIndex: 2, marginTop: "4px",transition:"all 0.3s" }}
                >
                  {isCompleted ? "✔️️️️️️" : (
                      <motion.div className={`w-4 h-4 rounded-full ${isCurrent ? "bg-green-500" : "bg-transparent"}`}
                      style={{position:"absolute"}} animate={isCurrent ? {opacity:[1,0,1]} : {}} transition={isCurrent ? {duration:0.8,repeat:Infinity,repeatType:"reverse"}:{}}
                      />
                      )}
                  {!isCompleted && !isCurrent && index+1}️️️️️
                </div>
                <span className={`mt-2 text-sm text-center ${isCurrent ? "font-bold text-blue-600" : "text-gray-600"} whitespace-normal max-w-xs`}>
                    <div key={index} className={index+1 === currentStep ? "active-step":""}>
                        {step.icon && <span className="step-icon">{step.icon}</span>}
                        <span className="step-label">{step.label}</span>
                    </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StepProgress;
