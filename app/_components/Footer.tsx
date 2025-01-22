"use client";

import React from "react";

const Footer = React.memo(() => {
    return (
        <footer className="w-full bg-primary-400 text-white min-h-[50px] flex justify-center items-center">
            <p>
                &copy; <span id="year"></span> Light Amazon. All Rights Reserved.
            </p>
        </footer>
    );
});

export default Footer;
