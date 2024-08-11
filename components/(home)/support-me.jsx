"use client";
import { useRef } from "react";
import SupportLine from "./ui/support-line";


export default function Support() {

    const supportRef = useRef(null);

    const scrollToSupport = () => {
        if (supportRef.current) {
            supportRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
       
        <div id="support" className="support-area over-hidden pt-45 pb-155" ref={supportRef}>
        <div className="support-wrapper position-relative mt--5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="title text-center">
                            <span className="theme-color text-uppercase d-block mb-6">
                                Buy me a coffee
                            </span>
                            <h2>2,115 Supporters</h2>
                        </div>
                    </div>
                </div>
                <div className="row portfolio mt-40">
                    {/* portfolio line start */}
                        <div className="col-12">
                            <SupportLine scrollToSupport={scrollToSupport}/>
                        </div>
                    {/* portfolio line end */}
                </div>
            </div>
        </div>
    </div>
    );
}
