import Preloader from "../components/ui/preloader";
import { jostMedium, openSans } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
    title: "Johndevoflagos Software-Engineer",
    description: "Welcome to Johndevoflagos Software-Engineer. I combine my passion for user-focused design with advanced development technologies.",
    openGraph: {
        title: "Johndevoflagos Software-Engineer",
        description: "Welcome to Johndevoflagos Software-Engineer. I combine my passion for user-focused design with advanced development technologies.",
        url: "https://www.johndevoflagos.com",
        site_name: "Johndevoflagos",
        images: [
            {
                url: "/images/metadataImage/metabg.JPG", // URL to your image
                width: 1200,
                height: 630,
                alt: "Johndevoflagos Background Image",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Johndevoflagos Software-Engineer",
        description: "Welcome to Johndevoflagos Software-Engineer. I combine my passion for user-focused design with advanced development technologies.",
        image: "/images/metadataImage/metabg.JPG", // URL to your image
    },
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${jostMedium.className} ${openSans.variable} over-hiddenn position-relative`}
                style={{
                    backgroundImage: "url('/images/slider/body-bg.jpg')",
                }}
            >
                <Preloader />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
