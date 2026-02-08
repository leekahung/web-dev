interface ISkillList {
  name: string;
  element: React.JSX.Element;
}

interface Props {
  itemName: string;
  itemList: ISkillList[];
}

export default function SkillRow({ itemName, itemList }: Props) {
  return (
    <div role="listitem" className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center sm:items-start">
      <h3 className="flex flex-1/3 text-base sm:text-xl font-semibold border-b w-full sm:w-auto sm:border-b-0 pb-1 sm:pb-0 justify-center sm:justify-start">{itemName}</h3>
      <div className="flex flex-2/3 sm:border-l-1">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 ml-0 sm:ml-4 text-sm sm:text-base">
          {itemList.map((item) => {
            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-1.5 sm:gap-2"
              >
                {item.element}
                <p className="font-medium">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
