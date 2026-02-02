import DownChevron from "./icons/DownChevron";

interface Props {
  elementId: string;
}

export default function ScrollToButton({ elementId }: Props) {
  return (
    <button
      className="cursor-pointer hover:scale-150 duration-300"
      aria-label={`Jump to ${elementId} section`}
      onClick={() =>
        document
          .getElementById(elementId)
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <DownChevron />
    </button>
  );
}
