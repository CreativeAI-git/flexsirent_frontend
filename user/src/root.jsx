import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import Loader from "./shared/components/loader";
import "./index.css";
import "./App.css";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://app.flexsirent.com/assets/img/fav_icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="https://app.flexsirent.com/admin/assets/img/fav_icon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Style Sheets */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/dashboard.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <link rel="stylesheet" href="/assets/css/dashbaord-responsive.css" />

        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />

        {/* Dynamic Script Loading */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/dubrox/Multiple-Dates-Picker-for-jQuery-UI/jquery-ui.multidatespicker.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <Provider store={store}>
      <div className="App">
        {isPageLoading && <Loader />}
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </div>
    </Provider>
  );
}

