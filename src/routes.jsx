import { Switch, Route } from "react-router-dom";
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import Auth from "pages/auth";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/article/:slug" component={Article} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
    </Switch>
  );
};
export default Routes;
