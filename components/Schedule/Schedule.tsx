"use client"

import { AwaitedReactNode, CSSProperties, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react'
import sessionData from './schedule.json';
import './Schedule.css'
import Link from 'next/link';


const Sessions = () => {
  const [dataIndex, setDataIndex] = useState(1)
  const [prevIndex, setPrevIndex] = useState(1)
  const [containerHeight, setContainerHeight] = useState('auto')
  const dayOneSessionData = sessionData[0]

  const dataRefs = useRef([]);

  const getTime = (_time: Date): string => {
    const d = new Date(_time)
    const hour =
      d.getHours() === 0 ? 12 : d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const ampm = d.getHours() < 12 ? 'AM' : 'PM'
    const time = hour + ':' + min + ' ' + ampm
    return time
  }

  useEffect(() => {
    const element = dataRefs.current[dataIndex];
    setContainerHeight(element.clientHeight)
    console.log(element.clientHeight)
  }, [sessionData, dataIndex]);

  const getStyle = (index: number): CSSProperties => {
    const isActive = dataIndex === index;
    const isPrev = prevIndex === index;
  
    let transform = 'translateX(100%)';
    let opacity = 0;
  
    if (isActive) {
      transform = 'translateX(0)';
      opacity = 1;
    } else if (isPrev) {
      transform = dataIndex > prevIndex ? 'translateX(-100%)' : 'translateX(100%)';
      opacity = 0;
    }
  
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)',
      transform,
      opacity,
      pointerEvents: isActive ? 'auto' : 'none',
    };
  };


  return (
    <>
      <div className="w-full max-w-7xl items-center justify-center flex flex-col lg:flex-row my-0 mx-auto gap-12 lg:pb-[62px] px-4">
        <div className="w-full">
          {/* <div className="text-6xl text-g-gray-8 mb-8 font-light">Schedule</div> */}
          <div className='sticky top-24 w-full z-10 bg-black' >
            <div className="h-10  lg:h-14 min-w-full w-max border-b-[1px] border-g-gray-3 flex gap-5 my-5">
              {sessionData.map((data) => (
                <div
                  key={data.index}
                  className={
                    'text-xl lg:text-2xl font-light px-8 h-full cursor-pointer' +
                    (dataIndex === data.index ? ' border-b-[2px] border-g-blue-3' : '')
                  }
                  onClick={() => {
                    setPrevIndex(dataIndex)
                    setDataIndex(data.index)
                  }}
                >
                  {data.title}
                </div>
              ))}
            </div>
          </div>

          <div className="schedule-container relative overflow-y-auto" style={{ height: containerHeight }}>
            {sessionData.map((session) => (
              <div
                key={session.index}
                ref={(el) => (dataRefs.current[session.index] = el)}
                id={`fade-in-${session.index}`}
                style={getStyle(session.index)}
              >
                {session.events?.map((event: any, key: number) => {
                  const startTime = getTime(event.startsAt)
                  const endTime = getTime(event.endsAt)

                  return (
                    <div key={key} className="flex w-full lg:w-auto ">
                      <div className="border-b-[1px] lg:border-r-[0px] lg:border-r-[1px] border-g-gray-3 flex flex-col items-end px-3 py-3 text-right lg:text-start">
                        <div className="text-base lg:text-xl"> {startTime}</div>
                        <div className="text-xs lg:text-sm font-light">{endTime}</div>
                        <div className="mt-1 text-[8px] lg:text-xs">GMT (+05:30)</div>
                      </div>
                      <div className="w-7/10 lg:w-4/5 flex flex-col p-3 border-b-[1px] border-g-gray-3 grow">
                        <div>
                          <div className="text-xs bg-google-green px-2 py-1 mb-2 w-fit">
                            {event.title === "Lunch" ? "Cafeteria" : "Workshop Hall"}
                          </div>
                          <div className="text-2xl font-light">{event.title}</div>
                          {event.speakers && (
                            <div className="flex items-center gap-2">
                              {event.speakers?.map((speaker: {
                                image: string | undefined; id: any, name: any
                              }) => {
                                return (
                                  speaker.name && (
                                    <Link href={"/speakers"} >
                                      <div className="flex items-center my-2 p-1 border-1 border-g-blue-3 w-fit rounded-full bg-google-blue text-white">
                                        <img
                                          className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                          src={speaker.image}
                                          alt={`${speaker.name} - image`}
                                        />
                                        <span className="text-xs ml-2  ">
                                          {speaker.name}
                                        </span>
                                      </div>
                                    </Link>
                                  )
                                )
                              })}
                            </div>
                          )}

                          {event.description && (
                            <div className="text-sm lg:text-base font-light">
                              {event.description}
                            </div>
                          )}

                          {event.technologies && (
                            <div className="flex items-center flex-wrap gap-2 my-2">
                              {event.technologies.map((tech: { name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined },key:number) => {
                                return (
                                  <div key={key} className="text-xs border border-white border-solid rounded-full px-2 py-1 w-fit">
                                    {tech.name}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default Sessions
