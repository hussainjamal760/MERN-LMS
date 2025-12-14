import PageContent from "./PageContent"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sheep-Academy",
  description: "Sheep Academy – Learn Anything, Anytime",
  keywords: "online learning platform, LMS website, video courses",
};

const Page = () => {
  return <PageContent />;
};

export default Page;