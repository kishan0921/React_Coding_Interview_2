import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Step1({ data, updateData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const newErrors = {}
    if (!data.firstName) newErrors.firstName = "Required"
    if (!data.lastName) newErrors.lastName = "Required"
    if (!data.email) newErrors.email = "Required"
    if (!data.phone) newErrors.phone = "Required"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    nextStep()
  }

  return (
    <div className="w-full animate-fade-in border-none shadow-none">
      <div className="px-0 pt-0 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-black">Personal Information</h2>
      </div>
      <div className="space-y-6 px-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground font-bold text-sm">First Name</Label>
            <Input 
              id="firstName" 
              value={data.firstName || ''} 
              onChange={(e) => {
                updateData({ firstName: e.target.value })
                if (errors.firstName) setErrors(prev => ({...prev, firstName: null}))
              }}
              className={errors.firstName ? "border-destructive bg-destructive/10" : "bg-card rounded-xl"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground font-bold text-sm">Last Name</Label>
            <Input 
              id="lastName" 
              value={data.lastName || ''} 
              onChange={(e) => {
                updateData({ lastName: e.target.value })
                if (errors.lastName) setErrors(prev => ({...prev, lastName: null}))
              }}
              className={errors.lastName ? "border-destructive bg-destructive/10" : "bg-card rounded-xl"}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-bold text-sm">Email Address</Label>
          <Input 
            id="email" 
            type="email"
            value={data.email || ''} 
            onChange={(e) => {
              updateData({ email: e.target.value })
              if (errors.email) setErrors(prev => ({...prev, email: null}))
            }}
            className={errors.email ? "border-destructive bg-destructive/10" : "bg-card rounded-xl"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-bold text-sm">Phone Number</Label>
          <Input 
            id="phone" 
            value={data.phone || ''} 
            onChange={(e) => {
              updateData({ phone: e.target.value })
              if (errors.phone) setErrors(prev => ({...prev, phone: null}))
            }}
            className={errors.phone ? "border-destructive bg-destructive/10" : "bg-card rounded-xl"}
          />
        </div>
      </div>
      
      <div className="px-0 pb-0 flex justify-between mt-12">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={true}
          className="border-slate-200 text-slate-400 font-bold px-6 py-6 rounded-xl hover:bg-transparent hover:text-slate-400"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-black hover:bg-black/90 text-white font-bold px-8 py-6 rounded-xl"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
