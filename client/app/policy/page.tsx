'use client'
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import Policy from "../components/Policy/Policy";

type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3); // Active index 3 for "Policy"
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy - Sheep-Academy"
        description="Sheep Academy Terms and Conditions - Read our policies regarding privacy, usage, and course access."
        keywords="policy, terms and conditions, privacy policy, sheep academy, LMS, rules"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;