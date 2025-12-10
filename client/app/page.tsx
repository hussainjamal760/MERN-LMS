"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")
  
  return (
    <>
      <Heading
        title="Sheep-Academy"
        description="Sheep Academy – Learn Anything, Anytime
Sheep Academy is a modern LMS platform where students can learn through high-quality video courses, quizzes, and assignments. Instructors can create, manage, and sell their courses just like on Udemy. With a fast, secure, and user-friendly interface, Sheep Academy delivers the best online learning experience."
        keywords="online learning platform

LMS website

video courses

buy and sell courses

instructor dashboard

student dashboard

e-learning system

online education

course marketplace

Udemy alternative

learn online

teaching platform

skill development courses

professional training

digital learning platform

Next.js LMS

modern LMS app

course management system"
      />
      <Header 
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      route={route}
      setRoute={setRoute}
      />
      <Hero/>
      <Courses/>
      <Reviews/>
      <FAQ/>
    </>
  );
};

export default Page;
