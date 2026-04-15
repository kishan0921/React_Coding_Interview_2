import React, { useState } from 'react'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Card } from '@/components/ui/card'
import { Check, User, Briefcase, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    experience: '',
    industry: '',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  }

  const [formData, setFormData] = useState(initialData)

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)
  
  const submitForm = () => {
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData(initialData)
    setStep(1)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-[450px] p-10 flex flex-col items-center justify-center text-center animate-fade-in mx-auto border-border shadow-lg rounded-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-bold text-black mb-2">Success!</h2>
        <p className="text-slate-500 mb-8 font-medium">
          Your form has been submitted.
        </p>
        <Button 
          onClick={resetForm}
          className="w-full bg-black hover:bg-black/90 text-white font-bold py-6 rounded-xl text-lg"
        >
          Submit Another Form
        </Button>
      </Card>
    )
  }

  const steps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Professional Info', icon: Briefcase },
    { id: 3, label: 'Billing Info', icon: CreditCard }
  ]

  return (
    <Card className="w-full max-w-[800px] p-10 mx-auto border-border bg-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-between mb-12 w-full max-w-lg mx-auto relative px-4">
        {/* Horizontal Line connecting steps */}
        <div className="absolute top-[1.5rem] left-[10%] w-[80%] h-[2px] bg-slate-200 -z-10" />
        {steps.map((s) => {
          const isCompleted = step > s.id
          const isActive = step === s.id
          const stepIcon = isCompleted ? Check : s.icon

          return (
            <div key={s.id} className="flex flex-col items-center relative gap-3 bg-white px-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isActive || isCompleted ? "bg-[#111] text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {React.createElement(stepIcon, { size: 24, strokeWidth: isActive || isCompleted ? 2.5 : 2 })}
              </div>
              <span className={`text-[13px] font-bold ${isActive || isCompleted ? "text-black" : "text-slate-500"}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-2">
        {step === 1 && <Step1 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 2 && <Step2 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 data={formData} updateData={updateFormData} prevStep={prevStep} submitForm={submitForm} />}
      </div>
    </Card>
  )
}
