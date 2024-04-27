import '@/styles/about.css';
import Starfield from 'react-starfield';
import AboutData from '@/public/assets/content/About/content.json';
import { cn } from '@/lib/utils';

function About() {
  const TextColorMap: { [key: string]: string } = {
    blue: 'text-google-blue',
    red: 'text-google-red',
    yellow: 'text-google-yellow',
    green: 'text-google-green',
  };
  return (
    <>
      <div className="bg-black text-white">
        <Starfield
          starCount={5000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
        />
        <div className="max-w-screen-lg mx-auto px-8 py-14">
          <div className="flex lg:flex-row flex-col gap-2  mb-4">
            <h1 className="font-bold md:text-5xl text-5xl">
              {AboutData.headerFixed}
            </h1>
            <div className="inner-headings">
              <span className="font-bold">
                {AboutData.headerWords.map((word) => (
                  <>
                    <text
                      className={cn(
                        TextColorMap[word.color] || '',
                        'md:text-5xl',
                        word.text.length > 16
                          ? word.text.length > 20
                            ? 'text-2xl'
                            : 'text-3xl'
                          : 'text-4xl'
                      )}
                    >
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
    </>
  );
}

export default About;
