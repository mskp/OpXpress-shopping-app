import Link from "next/link";

type FooterLinksProps = {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
};

/**
 * The FooterLinks component displays a list of links in the footer.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the link category.
 * @param {Array} props.items - An array of objects representing individual links.
 * @param {string} props.items.name - The name or text of the link.
 * @param {string} props.items.href - The URL the link points to.
 * @returns {JSX.Element} The rendered FooterLinks component.
 */
export default function FooterLinks({ title, items }: FooterLinksProps): JSX.Element {
  return (
    <ul className="flex flex-col gap-3">
      <h3 className="text-lg mb-2 font-medium text-blue-gray">{title}</h3>
      {items.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`py-1.5 font-normal transition-colors text-[#455A64] hover:text-[#263238]`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
