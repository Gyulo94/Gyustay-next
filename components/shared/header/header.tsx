import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  );
}
