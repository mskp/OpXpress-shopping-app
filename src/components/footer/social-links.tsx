import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  { href: "#", icon: <FaSquareXTwitter /> },
  { href: "#", icon: <FaFacebookF /> },
  { href: "#", icon: <FaInstagram /> },
  { href: "#", icon: <FaLinkedin /> },
];

/**
 * The SocialLinks component renders social media links with icons.
 *
 * @returns {JSX.Element} The rendered SocialLinks component.
 */
export default function SocialLinks(): JSX.Element {
  return (
    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
      {socialLinks.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className="opacity-80 transition-opacity hover:opacity-100"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
