import IconButton from "@/shared/components/IconButton";
import About from "./About";
import Contact from "./Contact";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <>
      <div className="relative flex items-center justify-center flex-col gap-4">
        <IconButton
          onClick={() => {
            (document.getElementById(title) as HTMLDialogElement).showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          {children}
        </IconButton>
        <p className="dark:peer-hover:text-orange-300 peer-hover:text-blue-500 peer-hover:font-semibold transition-[colors] duration-500 text-lg">
          {title}
        </p>
        <span className="absolute -bottom-1 w-0 peer-hover:w-[60%] peer-hover:h-px peer-hover:bg-blue-500 dark:peer-hover:bg-orange-300 transition-all duration-300" />
      </div>
      <dialog
        id={title}
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
              className="cursor-pointer rounded px-1 focus-visible:outline-2 focus-visible:outline-blue-500 dark:focus-visible:outline-orange-300"
              aria-label="Close dialog"
            >
              [ x ]
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

function getModalContent(title: string) {
  if (title === "About") return <About />;
  if (title === "Contact") return <Contact />;
}
