"use client";
import React from "react";
import Navigation from "./ui/navigation";
import Link from "next/link";
import useSticky from "@/hooks/useSticky";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggle/toggleSlice";

export default function Header1() {
    const isSticky = useSticky(2);
    const dispatch = useDispatch();

    // sidebar handler
    const sidebarHandler = (e) => {
        e.preventDefault();
        dispatch(toggleSidebar());
    };

    const PDF_FIlE_URL = "downloads/pdf/John-Adewunmi-CV.pdf";

    const downloadFileAtURL = (url) => {
        fetch(url).then(response => response.blob()).then(blob => {
            const blobURL = window.URL.createObjectURL(new Blob([blob]))
            const fileName = url.split("/").pop()
            const aTag = document.createElement("a")
            aTag.href = blobURL
            aTag.setAttribute("download", fileName)
            document.body.appendChild(aTag)
            aTag.click()
            aTag.remove()
        })

    }



    return (
        <header>
            <div
                className={`transparent-header header-area ${isSticky ? "sticky-menu" : ""
                    }`}
            >
                <div className="header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl- col-lg-2 col-md-3 col-sm-4 col-5">
                                <div className="logo mt-50 mb-50 transition5">
                                    <Link className="header-logo" href="/">
                                        <Image
                                            height={5546}
                                            width={201}
                                            src="/images/logo/logo.png"
                                            alt="JOHNDEVOFLAGOS"
                                            className="h-100 w-auto"
                                            priority
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8 col-7 pl-0 d-flex justify-content-end align-items-center">
                                <div className="main-menu">
                                    {/* navigation start */}
                                    <Navigation />
                                    {/* navigation end */}
                                </div>

                                <div className="header-btn pl-45">
                                    <Link
                                        href="/"
                                        className="white-text text-uppercase d-inline-block"
                                        onClick={() => { downloadFileAtURL(PDF_FIlE_URL) }}
                                    >
                                        Download Cv
                                    </Link>
                                </div>

                                <div className="mobile-m-bar d-block d-lg-none ml-30">
                                    <Link
                                        href="#"
                                        onClick={sidebarHandler}
                                        className="mobile-menubar theme-color primary-hover"
                                    >
                                        <i className="far fa-bars" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
