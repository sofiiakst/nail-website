import Logo from "./Logo";
import NavHelper from "./NavHelper";

function Header() {
  return (
    <header className=" justify-between flex z-[20] mx-auto flex-wrap max-w-full">
      <Logo />

      <NavHelper />
    </header>
  );
}

export default Header;
