import DownChevron from "./icons/DownChevron";

interface Props {
  elementId: string;
}

export default function ScrollToButton({ elementId }: Props) {
  return (
    <button
      className="cursor-pointer"
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
