import "@elastic/eui/dist/eui_theme_light.css";
import NavList from "./components/NavList";
import UserRoutes from "./routes/UserRoutes";
import ItemRoutes from "./routes/ItemRoutes";
import { EuiEmptyPrompt } from "@elastic/eui";
import { Switch, Route } from "react-router";

function App() {
  return (
    <>
      <NavList />
      <UserRoutes />
      <ItemRoutes />
      <Switch>
        <Route exact path="/403">
          <EuiEmptyPrompt
            iconType="alert"
            iconColor="danger"
            title={<h2>403 Forbidden</h2>}
          />
        </Route>
        <Route exact path="/404">
          <EuiEmptyPrompt
            iconType="alert"
            iconColor="danger"
            title={<h2>404 Not Found</h2>}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
