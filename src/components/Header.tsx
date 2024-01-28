import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import logo_texto_preto from "../assets/images/logo_texto_preto.png";
import logo_texto_branco from "../assets/images/logo_texto_branco.png";

const navigation = [
  { name: "Produtos", href: "#" },
  { name: "Empresa", href: "#" },
  { name: "Equipe", href: "#" },
  { name: "Contato", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 32);
  };

  const headerClasses = scrolled
    ? "bg-gray-900 bg-opacity-95 text-white backdrop-blur-sm shadow-lg"
    : "bg-transparent";

  useEffect(() => {
    setScrolled(window.scrollY > 32);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <nav
        className={`flex items-center justify-between p-6 transition-all lg:px-28`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">WSD Soluções</span>
            <img
              className="h-8 w-auto"
              src={scrolled ? logo_texto_branco.src : logo_texto_preto.src}
              alt="WSD Solucões Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className={`h-6 w-6 transition duration-300 ${
                scrolled ? "text-white" : "text-gray-900"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-semibold leading-6 transition duration-300 ${
                scrolled ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">WSD Soluções</span>
              <img
                className="h-8 w-auto"
                src={logo_texto_preto.src}
                alt="WSD Solucões Logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
