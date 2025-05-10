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
    <tr className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center sm:items-start">
      <td className="flex flex-1/3 text-xl">{itemName}</td>
      <td className="flex flex-2/3 sm:border-l-1">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 ml-4">
          {itemList.map((item) => {
            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-2"
              >
                {item.element}
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </td>
    </tr>
  );
}
