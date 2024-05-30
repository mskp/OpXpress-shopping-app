import Link from "next/link";

type FooterLinksProps = {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
};

export default function FooterLinks({ title, items }: FooterLinksProps) {
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
