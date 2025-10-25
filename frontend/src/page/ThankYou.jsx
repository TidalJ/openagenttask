import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg text-center p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">Your message has been sent successfully. We will get back to you shortly.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
