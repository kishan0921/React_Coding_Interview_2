import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft } from 'lucide-react'

export function Step3({ data, updateData, prevStep, submitForm }) {
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const newErrors = {}
    if (!data.cardNumber) newErrors.cardNumber = "Required"
    if (!data.cardholderName) newErrors.cardholderName = "Required"
    if (!data.expiryDate) newErrors.expiryDate = "Required"
    if (!data.cvv) newErrors.cvv = "Required"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    submitForm()
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="px-0 pt-0 mb-6">
        <h2 className="text-[26px] font-bold tracking-tight text-black">Billing Information</h2>
      </div>
      <div className="space-y-6 px-0">
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-black font-bold text-[15px]">Card Number</Label>
          <Input 
            id="cardNumber" 
            value={data.cardNumber || ''} 
            onChange={(e) => {
              updateData({ cardNumber: e.target.value })
              if (errors.cardNumber) setErrors(prev => ({...prev, cardNumber: null}))
            }}
            className={errors.cardNumber ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardholderName" className="text-black font-bold text-[15px]">Cardholder Name</Label>
          <Input 
            id="cardholderName" 
            value={data.cardholderName || ''} 
            onChange={(e) => {
              updateData({ cardholderName: e.target.value })
              if (errors.cardholderName) setErrors(prev => ({...prev, cardholderName: null}))
            }}
            className={errors.cardholderName ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-black font-bold text-[15px]">Expiry Date</Label>
            <Input 
              id="expiryDate" 
              value={data.expiryDate || ''} 
              onChange={(e) => {
                updateData({ expiryDate: e.target.value })
                if (errors.expiryDate) setErrors(prev => ({...prev, expiryDate: null}))
              }}
              className={errors.expiryDate ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-black font-bold text-[15px]">CVV</Label>
            <Input 
              id="cvv" 
              value={data.cvv || ''} 
              onChange={(e) => {
                updateData({ cvv: e.target.value })
                if (errors.cvv) setErrors(prev => ({...prev, cvv: null}))
              }}
              className={errors.cvv ? "border-destructive bg-destructive/10 h-12" : "bg-white border-slate-200 h-12 rounded-xl focus-visible:ring-1"}
            />
          </div>
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
          Submit
        </Button>
      </div>
    </div>
  )
}
