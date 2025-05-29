import Link from "next/link";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-gray-50 px-2">
      <Container>
        <div className="max-w-screen w-full mx-auto py-4 md:flex md:items-center md:justify-between border-b-gray-200 border-b">
          <div className="text-sm text-gray-800 sm:text-center">
            {" "}
            © 2025 <span className="hover:underline">Gyulo94.</span> All Rights
            Reserved.
          </div>
          <ul className="flex flex-wrap gap-4 md:gap-6 items-center text-sm text-gray-800 mt-2 sm:mt-0">
            <li>
              <Link href={"/login"} className="hover:underline">
                로그인
              </Link>
            </li>
            <li>
              <Link href={"/signup"} className="hover:underline">
                회원가입
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
