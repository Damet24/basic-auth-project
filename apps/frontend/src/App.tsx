import { RouterProvider } from "react-router";
import { AppProviders } from "./contexts/AppContext";
import { router } from "./routes";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
