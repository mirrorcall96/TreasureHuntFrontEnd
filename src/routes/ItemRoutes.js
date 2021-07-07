import { useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import { EuiLoadingContent } from "@elastic/eui";
import ItemList from "../components/item/ItemList";
import ItemHistory from "../components/item/ItemHistory";
const ItemRoutes = (props) => {
  let items = useSelector((state) => state.items.items);
  return items.length > 0 ? (
    <Switch>
      <Route exact path="/history/">
        <ItemHistory />
      </Route>
      <Route exact path="/">
        <ItemList />
      </Route>
    </Switch>
  ) : (
    <EuiLoadingContent lines={3} />
  );
};
export default ItemRoutes;
