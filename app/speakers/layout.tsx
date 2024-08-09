import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speakers",
};

export default function SpeakersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}