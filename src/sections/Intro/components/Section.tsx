import { useRef } from "react";
import IconButton from "@/shared/components/IconButton";
import About from "./About";
import Contact from "./Contact";

interface Props {
  title: "About" | "Contact";
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="relative flex items-center justify-center flex-col gap-2 sm:gap-4">
        <IconButton
          onClick={() => {
            dialogRef.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          {children}
        </IconButton>
        <p className="dark:peer-hover:text-orange-300 peer-hover:text-blue-500 peer-hover:font-semibold transition-colors duration-500 text-lg">
          {title}
        </p>
        <span className="absolute -bottom-1 w-0 peer-hover:w-[60%] peer-hover:h-px peer-hover:bg-blue-500 dark:peer-hover:bg-orange-300 transition-all duration-300" />
      </div>
      <dialog
        ref={dialogRef}
        className="m-auto w-full rounded-3xl backdrop:backdrop-blur-xs md:max-w-2xl bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border"
        aria-labelledby={`${title}-heading`}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(event) => {
          const target = event.target as HTMLDialogElement;
          if (target.nodeName === "DIALOG") target.close();
        }}
      >
        <div className="flex gap-2 flex-col p-4 sm:p-8">
          <h3 id={`${title}-heading`} className="font-bold text-2xl">
            {title}
          </h3>
          {getModalContent(title)}
          <form method="dialog" className="absolute top-4 right-6">
            <button
              className="cursor-pointer rounded p-1 focus-visible:outline-2 focus-visible:outline-blue-500 dark:focus-visible:outline-orange-300 opacity-60 hover:opacity-100 transition-opacity duration-150"
              aria-label="Close dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

function getModalContent(title: "About" | "Contact"): React.ReactNode {
  if (title === "About") return <About />;
  return <Contact />;
}
