import { useState } from "react";

import FooterContentData from "@/public/assets/content/Footer/content.json";
import {
  FooterContent,
  FooterListContent,
  FooterSectionContent,
} from "@/components/models/footer/datatype.props";
import Link from "next/link";
import Socials from "./blocks/Socials";
import { FooterRule } from "./models/datatype.props";
import FeatureRuleData from "@/public/assets/content/feature.rule.json";

const Footer = () => {
  const disabledFooterContent =
    FeatureRuleData.disabledFooterContent as FooterRule;
  return (
    <footer className='py-4 sm:py-6 w-full max-w-6xl mx-auto px-5 lg:p-0'>
      {disabledFooterContent?.footer ? (
        <>
          <hr className='my-6 border-gray sm:mx-auto lg:my-8' />
          <div className='md:flex md:justify-start'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 md:grid-cols-3'>
              {FooterContentData?.sections?.map(
                (sec: FooterSectionContent, i: number) => {
                  return (disabledFooterContent?.section[i]?.title ===
                    sec.title &&
                    !disabledFooterContent?.section[i]?.hide) ||
                    !disabledFooterContent?.section[i]?.hide ? (
                    <div key={"section-" + i}>
                      <h2 className='mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase '>
                        {sec.title}
                      </h2>
                      <ul className='text-gray-400 dark:text-g-gray-4  '>
                        {sec?.list.map((li: FooterListContent, j: number) => {
                          return !disabledFooterContent?.section[i]?.nOI ||
                            disabledFooterContent?.section[i]?.nOI - 1 >= j ? (
                            <li key={"list-" + j} className='mb-2'>
                              {li?.hyperlink ? (
                                <a
                                  href={li?.hyperlink}
                                  className='hover:underline'
                                >
                                  {li?.title}
                                </a>
                              ) : null}
                              {li?.link ? (
                                <Link
                                  href={li?.link}
                                  className='hover:underline'
                                >
                                  {li?.title}
                                </Link>
                              ) : null}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  ) : null;
                }
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <hr className='my-6 border-gray sm:mx-auto lg:my-8' />
      <div className='sm:flex sm:items-center sm:justify-center'>
        <Socials />
      </div>
    </footer>
  );
};

export default Footer;
