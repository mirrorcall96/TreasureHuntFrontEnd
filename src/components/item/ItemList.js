import {
  EuiBasicTable,
  EuiSpacer,
  EuiButton,
  EuiToolTip,
  EuiGlobalToastList,
} from "@elastic/eui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openItem } from "../../store/action/itemActions";

const ItemList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [alert, setAlert] = useState([]);
  const alertMessage = (result) => {
    setAlert([...alert, result]);
  };
  console.log(alert);
  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };
  let dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const user = useSelector((state) => state.user.user);
  const columns = [
    {
      field: "data",
      name: "Data",
    },
    {
      field: "id",
      name: "Check",
      render: (id) =>
        user && user.balance >= 5 ? (
          <EuiButton
            onClick={() => {
              dispatch(openItem(id, alertMessage));
            }}
            size="s"
            fill
          >
            Open
          </EuiButton>
        ) : (
          <EuiToolTip
            position="top"
            content={
              user ? "You don't have enough balance" : "You need to login"
            }
          >
            <EuiButton size="s" fill isDisabled>
              Open
            </EuiButton>
          </EuiToolTip>
        ),
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
      <EuiGlobalToastList
        toasts={alert.map((a) => {
          return {
            color: a.status,
            id: Math.floor(Math.random() * 50 + 150),
            title: "result",
            text: <p>{a.message}</p>,
          };
        })}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};

export default ItemList;
