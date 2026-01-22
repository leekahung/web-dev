import DownChevron from "./icons/DownChevron";

interface Props {
  elementId: string;
}

export default function ScrollToButton({ elementId }: Props) {
  return (
    <button
      className="cursor-pointer hover:scale-150 duration-300"
      onClick={() =>
        document
          .getElementById(elementId)
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <span className="sr-only">scroll to {elementId}</span>
      <DownChevron />
    </button>
  );
}
