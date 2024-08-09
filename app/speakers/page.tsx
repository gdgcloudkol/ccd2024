'use client';

import CardGrid from "@/components/CardGrid";
import AlternateHeader from "@/components/blocks/AlternateHeader";
import { GridData, PeopleCards } from "@/components/models/cardGrid.model";
import speakerList from "@/public/assets/content/Speakers/content.json";
import FeatureRule from "@/public/assets/content/feature.rule.json";
import { useEffect, useState } from "react";

export default function Speakers() {
  const peopleList: GridData[] = speakerList.allPeople as GridData[];
  const disabledSpeakersContent = FeatureRule.disabledSpeakerContent;

  const [speakers, setSpeakers] = useState<PeopleCards[]>([]);

  const getNormalSpeaker = async () => {
    const filterIds =['7a5d302d-661e-4b56-b7c4-283f7208f371','c185e3ae-0cd9-49f5-bbb3-2a8d95636a9a']
    try {
      const res = await fetch('https://sessionize.com/api/v2/ilkj4hf0/view/Speakers');
      const data = await res.json();
      const filteredData = data.filter((speaker: any) => !filterIds.includes(speaker.id));
      setSpeakers(()=> filteredData.map((speaker: any) => {     

        let linkedin = speaker.links.find((link: any) => link.title === 'LinkedIn')?.url;
        let twitter = speaker.links.find((link: any) => link.title === 'Twitter')?.url;

        if(!linkedin)
          linkedin = speaker?.questionAnswers?.[2]?.answer
        if(!twitter)
          twitter = speaker?.questionAnswers?.[1]?.answer

        return {
          id: speaker.id,
          title: speaker.fullName,
          content: speaker.tagLine,
          image: speaker.profilePicture,
          linkedin: linkedin,
          twitter: twitter
        } 
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNormalSpeaker();
  }, []);
  
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto space-y-8'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-4'>
        {!disabledSpeakersContent.speakers ? (
          <AlternateHeader
            title={speakerList.title}
            color={speakerList.color}
            description={speakerList.description}
          />
        ) : (
          peopleList.map((people: GridData, index: number) => {
            return <CardGrid key={index} gridData={people} type='People' />;
          })
        )}
        {
          speakers.length > 0 && <CardGrid gridData={{ title: 'Final Day Speakers', description: 'Discover our Featured Speakers for the Final Day', people: speakers }} type='People' />
        }
      </section>
    </section>
  );
}