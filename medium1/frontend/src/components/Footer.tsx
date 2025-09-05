export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} MadCom . All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/about" className="text-sm text-gray-600 hover:text-blue-600">
              Made by — Amulya Ratna
            </a>
          
          </div>
        </div>
      </div>
    </footer>
  );
};