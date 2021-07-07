import { EuiBasicTable, EuiSpacer, EuiHealth } from "@elastic/eui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { openItem } from "../../store/action/itemActions";

const ItemHistory = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  console.log(alert);
  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };
  const items = useSelector((state) => state.items.history);
  const user = useSelector((state) => state.user.user);

  if (!user) return <Redirect to="/403" />;
  const columns = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "data",
      name: "Data",
    },
    {
      field: "isTreasure",
      name: "result",
      render: (isTreasure) => {
        const color = isTreasure === "TRUE" ? "success" : "danger";
        const label = isTreasure === "TRUE" ? "Won" : "Lost";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: items.length,
    pageSizeOptions: [3, 5, 8],
  };
  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiBasicTable
        items={items}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
};

export default ItemHistory;
