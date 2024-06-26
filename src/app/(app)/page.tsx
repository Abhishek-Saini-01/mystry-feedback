
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import messages from '@/messages.json';
import Autoplay from 'embla-carousel-autoplay';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const {data: session} = useSession();
  
  return (
    <>
      <section>
      <div className="relative w-full bg-gray-800">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
            <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2">
              <p className="text-xs text-gray-200 font-medium md:text-sm">
                Lorem ipsum dolor sit amet consectetur.
                <span className="ml-2 cursor-pointer font-bold">Read More &rarr;</span>
              </p>
            </div>
            <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
              Dive into the World of Anonymous Feedback
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-gray-300">
            True Feedback - Where your identity remains a secret.
            </p>
            <div className="mt-4">
            {!session && <Link href="/sign-up">
            <Button className='mt-3 bg-black  text-lg px-3 py-1' >Create a free account
              </Button></Link>}
          {session && <Link href="/dashboard">
            <Button className='mt-3 bg-black text-lg' >Dashboard
              </Button></Link>}
            </div>
          </div>
          {/* <div className="rounded-lg bg-gray-200 p-4"> */}
          <div>
            <Image
              className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[500px] lg:object-center"
              src="/new-message.svg"
              width={500}
              height={500}
              alt=""
            />
          </div>
        </div>
      </div>
      </section>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        {/* <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>

          {!session && <Link href="/sign-up">
            <Button className='mt-3 bg-black text-lg' >Create a free account
              </Button></Link>}
          {session && <Link href="/dashboard">
            <Button className='mt-3 bg-black text-lg' >Dashboard
              </Button></Link>}
        </section> */}

        

        
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 Mystry Feedback. All rights reserved.
      </footer>
    </>
  );
}
