import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-20 bg-[#f8f9fa] dark:bg-[#0b1120] text-gray-600 dark:text-gray-300 border-t border-[#0000000e] dark:border-[#ffffff1e]">
      
      <div className="w-[95%] 800px:w-[90%] m-auto py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          <div className="space-y-4">
            <h3 className="text-[25px] font-[600] font-Poppins text-black dark:text-white">
              Sheep <span className="text-[#37a39a]">Academy</span>
            </h3>
            <p className="text-[15px] font-Poppins leading-7">
              Empowering learners worldwide with cutting-edge courses. 
              Built with passion, driven by excellence. 
              Join the revolution of digital education today.
            </p>
            <div className="flex gap-4 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                <div 
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm hover:bg-[#37a39a] hover:text-white dark:hover:bg-[#37a39a] transition-all duration-300 cursor-pointer group"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[20px] font-[600] font-Poppins text-black dark:text-white">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about" },
                { name: "Our Courses", link: "/courses" },
                { name: "Instructors", link: "/instructors" },
                { name: "Events", link: "/events" },
                { name: "Become a Teacher", link: "/profile" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.link}
                    className="text-[15px] hover:text-[#37a39a] hover:pl-2 transition-all duration-300 block font-Poppins"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[20px] font-[600] font-Poppins text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", link: "/contact" },
                { name: "Privacy Policy", link: "/policy" },
                { name: "Terms & Conditions", link: "/terms" },
                { name: "FAQ", link: "/faq" },
                { name: "Refund Policy", link: "/refund" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.link}
                    className="text-[15px] hover:text-[#37a39a] hover:pl-2 transition-all duration-300 block font-Poppins"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[20px] font-[600] font-Poppins text-black dark:text-white">
              Contact Info
            </h3>
            <div className="space-y-3 text-[15px] font-Poppins">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#37a39a]" />
                Lahore, Punjab, Pakistan
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#37a39a]" />
                +92 300 8889703
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-[#37a39a]" />
                hjamal9865@gmail.com
              </p>
            </div>

            <div className="pt-4">
                <h4 className="text-[16px] font-[500] mb-2 text-black dark:text-white">Subscribe to our Newsletter</h4>
                <div className="flex bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-[#00000015] dark:border-[#ffffff15]">
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-transparent outline-none text-sm text-black dark:text-white"
                    />
                    <button className="bg-[#37a39a] hover:bg-[#2c867e] text-white px-4 py-2 text-sm font-semibold transition-colors duration-300">
                        Go
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full bg-white dark:bg-slate-900 border-t border-[#0000000e] dark:border-[#ffffff1e] py-6 text-center">
        <p className="text-[14px] font-Poppins">
          Copyright © 2026 <span className="text-[#37a39a] font-semibold">Sheep Academy</span>. All Rights Reserved. 
          <br className="sm:hidden"/> 
           Built by Hussain Jamal.
        </p>
      </div>
    </footer>
  );
};

export default Footer;