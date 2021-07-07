import { useSelector } from "react-redux";
import { Switch, Route } from "react-router";
import Signup from "../components/user/Signup";
import Signin from "../components/user/Signin";
import Signout from "../components/user/Signout";
import { EuiLoadingContent } from "@elastic/eui";

const UserRoutes = (props) => {
  let items = useSelector((state) => state.items.items);
  //let user = useSelector((state) => state.user.user);

  return items.length > 0 ? (
    <Switch>
      <Route exact path="/signup/">
        <Signup />
      </Route>
      <Route exact path="/signin/">
        <Signin />
      </Route>

      <Route exact path="/signout/">
        <Signout />
      </Route>
    </Switch>
  ) : (
    <EuiLoadingContent lines={3} />
  );
};
export default UserRoutes;
