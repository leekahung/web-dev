import IconButton from "@/shared/components/IconButton";
import About from "./About";
import Contact from "./Contact";
import Skills from "./Skills";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <>
      <div className="relative flex items-center justify-center flex-col gap-4">
        <IconButton
          onClick={() =>
            (document.getElementById(title) as HTMLDialogElement).showModal()
          }
        >
          {children}
        </IconButton>
        <p className="dark:peer-hover:text-orange-300 peer-hover:text-blue-500 peer-hover:font-semibold transition-[colors] duration-500">
          {title}
        </p>
        <span className="absolute bottom-[-4px] w-0 peer-hover:w-[60%] peer-hover:h-[1px] peer-hover:bg-blue-500 dark:peer-hover:bg-orange-300 transition-all duration-500" />
      </div>
      <dialog
        id={title}
        className="m-auto w-full rounded-3xl backdrop:backdrop-blur-xs md:max-w-2xl bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border-1"
        onClick={(event) => {
          const target = event.target as HTMLDialogElement;
          if (target.nodeName === "DIALOG") target.close();
        }}
      >
        <div className="flex gap-4 flex-col p-8">
          <h3 className="font-bold text-lg">{title}</h3>
          {getModalContent(title)}
          <form method="dialog" className="absolute top-8 right-8">
            <button className="cursor-pointer">[ x ]</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

function getModalContent(title: string) {
  if (title === "About") return <About />;
  if (title === "Skills") return <Skills />;
  if (title === "Contact") return <Contact />;
}
