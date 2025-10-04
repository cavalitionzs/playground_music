import Link from "next/link";

const Footer = () => {
  return (
    <footer className="z-50 w-full bg-gray-900 text-white py-6 sm:py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-4 md:gap-6">
        <p className="text-center sm:text-left text-lg font-medium leading-relaxed">
          Find Bug? <br className="sm:block hidden" />
          Contact me to fix it!
        </p>

        <Link
          href="/contact"
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold shadow"
        >
          Contact
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Cavalitionzs Playground. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
