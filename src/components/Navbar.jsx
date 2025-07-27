import { appleImg, searchImg, bagImg } from "../utils";
import { navLists } from "../constants";
function Navbar() {
  return (
    <header className="flex items-center justify-between py-5 sm:px-10 px-5 w-full">
      <nav className="flex w-full screen-max-width">
        {/* Apple logo */}

        <img src={appleImg} alt="appleLogo" width={14} height={14} />

        {/* navList items */}
        <div className="flex flex-1 justify-center max-sm:hidden gap-5">
          {navLists.map((nav, index) => (
            <div
              key={nav}
              className=" text-sm text-gray cursor-pointer hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>
        {/* search and bag icons */}
        <div className="flex items-baseline max-sm:flex-1 max-sm:justify-end gap-7 ">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="Bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
