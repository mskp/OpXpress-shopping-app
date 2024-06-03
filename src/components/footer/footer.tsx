import { APP_NAME, FOOTER_LINKS } from "@/config/consts";
import BrandIcon from "../misc/brand-icon";
import FooterLinks from "./footer-links";
import SocialLinks from "./social-links";

/**
 * The Footer component renders the footer section of the website.
 * It includes the brand icon, footer links, and social links.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative w-full bg-opacity-50 mt-5 shadow-2xl pt-10">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h2 className="text-xl mb-6 font-bold logo">
            <BrandIcon />
          </h2>
          <div className="grid grid-cols-2 justify-between gap-2">
            {FOOTER_LINKS.map((links, idx) => (
              <FooterLinks key={idx} {...links} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <p className="text-sm mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
            &copy; {`${currentYear} ${APP_NAME} All Rights Reserved.`}
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
