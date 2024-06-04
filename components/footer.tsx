export const Footer = () => {
  return (
    <footer className="w-full p-8 flex justify-between text-center text-xs">
      <p>
        Made by{" "}
        <a
          href="https://abel.so"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Abel
        </a>
      </p>
      <p>
        Inspired by{" "}
        <a
          href="https://principles.com"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Ray Dalio
        </a>
      </p>
    </footer>
  );
};
