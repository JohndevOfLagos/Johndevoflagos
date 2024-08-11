import { experience2 } from "@/data/site";
import ExperienceList from "./ui/experience-list";

export default function Experience() {
    return (
        <div className="experience-area over-hidden pb-165">
            <div className="experience-wrapper extra-width position-relative">
                <div
                    className="experience-bg-img left-0 top-0 bottom-0 bg-cover no-repeat w-50 position-absolute"
                    style={{
                        backgroundImage: "url(/images/work/work-img.png)",

                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-none">
                            <div
                                className="experience-img"
                                data-aos="fade-right"
                                data-aos-duration={2000}
                            ></div>
                        </div>
                        <div className="col-xl-6 col-lg-6 offset-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="experience-margin mt-160 pb-80 pl-100 mb-50">
                                <div className="position-relative">
                                    <div className="title">
                                        <span className="theme-color text-uppercase d-block mb-6 mt--5">
                                            Work Experience
                                        </span>
                                        <h2 className="mb-25">My Experience</h2>
                                        <p>
                                            Experience is what makes the
                                            difference between writing
                                            clean programs to make
                                            software work and simply
                                            making it work. Call me if you
                                            want to discuss this further.
                                        </p>
                                    </div>
                                </div>
                                <div className="experience-wrapper pt-25">
                                    <ul className="experience-content">
                                        {/* experience list start */}
                                        {experience2
                                            ?.slice(0, 3)
                                            .map((item, i) => (
                                                <ExperienceList
                                                    key={i}
                                                    data={item}
                                                />
                                            ))}
                                        {/* experience list end */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
