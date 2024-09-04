import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import SignUp from "./SignUp"; // Import SignUp component
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State to control SignUp modal

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative bg-gradient-to-r from-purple-500 to-purple-900'>
        <nav className='container mx-auto flex items-center justify-between p-5 mb-5'>
          <div>
            <Link to='/' className='text-white font-bold text-xl'>
              Skill<span className='text-white'>Sync</span>
            </Link>
          </div>

          <ul className='hidden lg:flex gap-10 text-base text-white'>
            <li>
              <Link to='/'>Find Job</Link>
            </li>
            <li>
              <Link to='/companies'>Companies</Link>
            </li>
            <li>
              <Link to='/upload-job'>Upload Job</Link>
            </li>
            <li>
              <Link to='/about-us'>About</Link>
            </li>
          </ul>

          <div className='hidden lg:block'>
            {!user?.token ? (
              <CustomButton
                title='Sign Up' // Change to Sign Up
                containerStyles='bg-white text-[#723ab7] py-1.5 px-5 focus:outline-none hover:bg-[#723ab7] hover:text-white rounded-full text-base border border-[#723ab7]'
                onClick={() => setModalOpen(true)} // Open modal on click
              />
            ) : (
              <MenuList user={user} />
            )}
          </div>

          <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {/* ... (existing mobile menu code) */}

      </div>

      {/* SignUp Modal */}
      <SignUp open={modalOpen} setOpen={setModalOpen} />
    </>
  );
};

export default Navbar;