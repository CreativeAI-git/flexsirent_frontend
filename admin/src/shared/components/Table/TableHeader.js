const TableHeader = ({ data = [] }) => {
  return (
    <thead>
      <tr>
        {data?.map((header, index) => (
          // <th key={index} className={index === data?.length - 1 ? 'text-end' : ""}>{header}</th>
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
