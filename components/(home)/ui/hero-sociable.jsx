import { Link } from "react-scroll";



const socialLink = [
    {
        icon: "fab fa-github",
        link: "/",
    },
    {
        icon: "fab fa-instagram",
        link: "/",
    },

    {
        icon: "fab fa-facebook-f",
        link: "/",
    },
    {
        icon: "fab fa-linkedin-in",
        link: "/",
    },
    {
        icon: "fab fa-youtube",
        link: "/",
    },

];

export default function HeroSociable() {
    return (
        <div className="slider-social-link position-absolute right-0 d-none d-md-block z-index11">
            <ul className="social pr-60">
                {socialLink.map((item, i) => (
                    <li key={i} className="mt-10 mb-10 rotate-hover">
                        <Link
                            className="text-white text-center d-inline-block rotate"
                            href={item.link}
                        >
                            <i className={item.icon} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
