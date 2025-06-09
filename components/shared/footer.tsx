import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-gray-50 px-2">
      <Container>
        <div className="w-full py-4 flex items-center justify-center border-b-gray-200 border-b">
          <div className="text-sm text-gray-800 sm:text-center">
            {" "}
            © 2025 <span className="hover:underline">Gyulo94.</span> All Rights
            Reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
