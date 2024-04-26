import React from 'react';
import '../styles/about.css';
import AboutData from '@/public/assets/content/About/content.json';

function About() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-8 py-14">
        <div className="flex lg:flex-row flex-col gap-2  mb-4">
          <h1 className="font-bold md:text-5xl text-4xl">
            {AboutData.headerFixed}
          </h1>
          <div className="inner-headings">
            <span className="font-bold md:text-5xl text-2xl">
              {AboutData.headerWords.map((word) => (
                <>
                  <text className={`text-google-${word.color}`}>
                    {word.text} <br />
                  </text>
                </>
              ))}
            </span>
          </div>
        </div>
        <p className="md:text-2xl text-lg">{AboutData.description}</p>
      </div>
    </div>
  );
}

export default About;
