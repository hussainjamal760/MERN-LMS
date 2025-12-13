'use client'
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import About from "../components/About/About";

type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2); // Index 2 matches "About" in NavItems
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About Us - Sheep-Academy"
        description="About Sheep Academy - Learn more about our mission, vision, and the team behind the platform."
        keywords="about us, mission, vision, team, online learning, sheep academy, LMS"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;