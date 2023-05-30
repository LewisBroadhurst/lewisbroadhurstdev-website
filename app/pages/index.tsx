import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Introduction from '@/components/home/Introduction';
import Footer from '@/components/home/Footer';
import Experience from '@/components/home/Experience';



export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='text-white bg-gray-800 flex flex-col'>
        <Header />

        {/* // Should create a custom container for each section to avoid repeating code :) */}

        <section className='flex flex-col gap-24 lg:gap-24 xl:gap-36'>
          <Introduction />

          <Experience />
        </section>

        <Footer />
      </main>
    </>
  )
}
