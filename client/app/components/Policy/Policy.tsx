import React from "react";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="text-black dark:text-white font-Poppins">
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <h1 className="text-center text-[25px] leading-[35px] sm:text-[30px] lg:text-[45px] font-[700] tracking-tight mb-8">
          Platform <span className="text-[#37a39a]">Terms & Conditions</span>
        </h1>

        <div className="w-full">
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to <span className="text-[#37a39a] font-bold">Sheep Academy</span>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
            </p>

            <br />
            
            <ul className="list-disc ml-6 space-y-6 text-[16px] leading-8">
                <li>
                    <strong className="text-[18px]">1. Introduction and Acceptance</strong>
                    <p className="mt-1">
                    These Terms of Use govern your access to and use of Sheep Academy. By enrolling in a course or using our services, you accept these terms in full. If you disagree with any part of these terms, you must not use our website.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">2. User Accounts</strong>
                    <p className="mt-1">
                    To access certain features, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">3. Intellectual Property Rights</strong>
                    <p className="mt-1">
                    Unless otherwise stated, Sheep Academy and/or its licensors own the intellectual property rights for all material on Sheep Academy. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">4. Course Enrollment and Lifetime Access</strong>
                    <p className="mt-1">
                    When you purchase a course, you get a license from us to view it via the Sheep Academy services and no other use. Don't try to transfer or resell courses in any way. We grant you a lifetime access license, except when we must disable the course because of legal or policy reasons.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">5. Payments and Refunds</strong>
                    <p className="mt-1">
                    All payments are secured via Stripe. We offer a 30-day money-back guarantee on most courses. If you are not satisfied with your purchase, you may request a refund within the first 30 days, provided you have not completed a significant portion of the course content.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">6. Code of Conduct</strong>
                    <p className="mt-1">
                    You agree to use the platform only for lawful purposes. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, or profane material that could constitute or encourage conduct that would be considered a criminal offense or give rise to civil liability.
                    </p>
                </li>

                <li>
                    <strong className="text-[18px]">7. Privacy Policy</strong>
                    <p className="mt-1">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.
                    </p>
                </li>
            </ul>

            <br />
            <br />
            
            <p className="text-[16px] leading-8 text-center text-gray-600 dark:text-gray-400">
                Last updated: December 2025 <br/>
                © {new Date().getFullYear()} Sheep Academy. All rights reserved.
            </p>
             <br />
             <br />
        </div>
      </div>
    </div>
  );
};

export default Policy;