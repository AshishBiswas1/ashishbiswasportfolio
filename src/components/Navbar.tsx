import Link from "next/link";

export default function Navbar() {
 const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/internships", label: "Internships" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
 ];

 return (
  <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
   <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
     Ashish Biswas
    </Link>
    <div className="hidden md:flex gap-6">
     {links.map((link) => (
      <Link
       key={link.href}
       href={link.href}
       className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
       {link.label}
      </Link>
     ))}
    </div>
   </div>
  </nav>
 );
}
