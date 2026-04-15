import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Step2({ data, updateData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const newErrors = {}
    if (!data.company) newErrors.company = "Required"
    if (!data.position) newErrors.position = "Required"
    if (!data.experience || data.experience === "") newErrors.experience = "Required"
    if (!data.industry) newErrors.industry = "Required"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    nextStep()
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="px-0 pt-0 mb-6">
        <h2 className="text-[26px] font-bold tracking-tight text-black">Professional Details</h2>
      </div>
      <div className="space-y-6 px-0">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-black font-bold text-[15px]">Company</Label>
          <Input 
            id="company" 
            value={data.company || ''} 
            onChange={(e) => {
              updateData({ company: e.target.value })
              if (errors.company) setErrors(prev => ({...prev, company: null}))
            }}
            className={errors.company ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position" className="text-black font-bold text-[15px]">Position</Label>
          <Input 
            id="position" 
            value={data.position || ''} 
            onChange={(e) => {
              updateData({ position: e.target.value })
              if (errors.position) setErrors(prev => ({...prev, position: null}))
            }}
            className={errors.position ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-black font-bold text-[15px]">Years of Experience</Label>
          <div className="relative">
            <select
              id="experience"
              value={data.experience || ''}
              onChange={(e) => {
                updateData({ experience: e.target.value })
                if (errors.experience) setErrors(prev => ({...prev, experience: null}))
              }}
              className={`w-1/3 flex h-12 rounded-xl border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none bg-white ${
                errors.experience ? "border-destructive bg-destructive/10" : "border-slate-200"
              } ${!data.experience ? "text-slate-400" : "text-black"}`}
            >
              <option value="" disabled hidden>Select experience</option>
              <option value="0-2">0 - 2 years</option>
              <option value="3-5">3 - 5 years</option>
              <option value="5-10">5 - 10 years</option>
              <option value="10+">10+ years</option>
            </select>
            <div className="absolute inset-y-0 left-[33%] -ml-6 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-black font-bold text-[15px]">Industry</Label>
          <Input 
            id="industry" 
            value={data.industry || ''} 
            onChange={(e) => {
              updateData({ industry: e.target.value })
              if (errors.industry) setErrors(prev => ({...prev, industry: null}))
            }}
            className={errors.industry ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
          />
        </div>
      </div>
      
      <div className="px-0 pb-0 flex justify-between mt-12">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="border-slate-200 text-black font-bold px-6 py-6 rounded-xl hover:bg-slate-50 border-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-[#111] hover:bg-black/90 text-white font-bold px-8 py-6 rounded-xl"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
