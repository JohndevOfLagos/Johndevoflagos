import Image from "next/image";

export default function AboutInfo() {
    return (
        <div className="about-content position-relative mb-50">
            <div className="position-relative">
                <div className="title">
                    <span className="theme-color text-uppercase d-block mb-2 mt--5">
                        About Me
                    </span>
                    <h2 className="mb-30">I Develop System that Works</h2>
                </div>
            </div>
            <p className="mb-25">
                I combine my passion for user-focused design with advanced development technologies to create seamless and engaging digital experiences. With over 350+ satisfied clients, I have a proven track record of delivering exceptional results.
            </p>
            <p className="mb-25">
                My approach is centered on understanding client needs and delivering projects on time and within budget, ensuring that each project not only meets but exceeds expectations&#39;s.
            </p>

            <p className="mb-25">
                I am dedicated to bringing your vision to life with precision and creativity&rsquo;s.
            </p>

            <div className="about-info-wrapper pt-25 pb-20 mt-25">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12">
                        <ul className="about-info">
                            <li className="d-inline-block pr-50">
                                <p className="jostMedium-font-family mb-6">
                                    Name
                                </p>
                                <p className="jostMedium-font-family mb-6">
                                    Age
                                </p>
                                <p className="jostMedium-font-family mb-6">
                                    Occupation
                                </p>
                            </li>

                            <li className="d-inline-block">
                                <p className="mb-6">John Adewunmi</p>
                                <p className="mb-6">25 Years</p>
                                <p className="mb-6">Frontend Deverloper</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12">
                        <ul className="about-info align-item-center">
                            <li className="d-inline-block pr-50">
                                <p className="jostMedium-font-family mb-6">
                                    Phone
                                </p>
                                <p className="jostMedium-font-family mb-6">
                                    Email
                                </p>
                                <p className="jostMedium-font-family mb-6">
                                    Nationality
                                </p>
                            </li>

                            <li className="d-inline-block">
                                <p className="mb-6">+234 916 1669 860</p>
                                <p className="mb-6 mb-email">johnayomideadewunmi@gmail</p>
                                <p className="mb-6">Nigeria</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="about-footer-content d-sm-flex align-items-center mt-lg-2 mt-sm-4 mt-3">
                <div className="signature pt-12 pr-45">
                    <Image
                        height={99}
                        width={178}
                        src="/images/about/signature.png"
                        alt="signature"
                    />

                </div>
                <div className="about-footer-content-right mt-20 text-left">
                    <h6 className="d-xl-inline-block text-uppercase pr5 mb-0">
                        John Adewunmi
                    </h6>
                    <span className="openS-font-family meta-text-color ml-2">
                        Chief executive officer, JOHNDEV TECHNOLOGIES.
                    </span>
                </div>
            </div>
        </div>
    );
}
