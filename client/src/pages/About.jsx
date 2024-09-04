import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-[#6C22A6] font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-7'>
SkillSync is a transformative professional empowerment platform designed to connect individuals with the skills they need to thrive in today's 
competitive job market. Our mission is to bridge the gap between talent and opportunity by providing a comprehensive suite of tools for skill development, job searching, and networking.
 Whether you're a job seeker looking to enhance your qualifications or a company seeking to discover top talent, 
SkillSync offers personalized resources and insights tailored to your needs. 
Join us in empowering your career journey and unlocking your full potential with SkillSync!
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[300px]' />
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>

        </p>
      </div>
    </div>
  );
};

export default About;
