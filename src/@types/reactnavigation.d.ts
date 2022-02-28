import { AppBottomTabsParams } from "../routes/app.routes";
import { AppStackParams } from "../routes/appstack.routes";
import { AuthStackParams } from "../routes/auth.routes";

type AppParams = AppStackParams & AuthStackParams & AppBottomTabsParams

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppParams {}
  }
}
