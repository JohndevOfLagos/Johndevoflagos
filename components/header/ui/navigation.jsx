import navigation from "@/data/navigation";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="d-none d-lg-block">
            <ul className="d-block">
                {navigation?.map((item, i) => (
                    <li key={i}>
                        {item.isPageLink ? (
                            <Link href={item.path}>
                                {item.name}
                            </Link>
                        ) : (
                            <ScrollLink
                                href="#"
                                to={item.path}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                activeClass="ui-nav-active"
                            >
                                {item.name}
                            </ScrollLink>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
