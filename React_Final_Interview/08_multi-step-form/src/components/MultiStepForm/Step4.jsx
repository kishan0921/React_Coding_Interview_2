import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function Step4({ data, prevStep, submitForm }) {
  return (
    <Card className="w-full animate-fade-in border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl text-primary">Finishing up</CardTitle>
        <CardDescription>Double-check everything looks OK before confirming.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="rounded-lg bg-card border p-4 space-y-3">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium text-foreground capitalize">{data.plan} Plan</p>
            </div>
            <div className="font-bold text-foreground">{data.price}</div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{data.firstName} {data.lastName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{data.email}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-medium">{data.phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0 pb-0 justify-between mt-4">
        <Button variant="outline" onClick={prevStep}>Go Back</Button>
        <Button onClick={submitForm} className="bg-primary hover:bg-primary/90">Confirm</Button>
      </CardFooter>
    </Card>
  )
}
