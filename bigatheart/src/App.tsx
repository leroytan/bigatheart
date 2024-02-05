import { useEffect, useState } from "react";
import { supabase } from "./components/supabaseClient";
import Account from "./pages/account";
import { Session } from "@supabase/supabase-js";
import Signin from "./components/signin";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./components/signup";
import NavBar from "./components/navbar";
import Homepage from "./pages/homepage";
import ActivityPage from "./pages/activitypage";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            path="/"
            element={!session ? <Signin /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/signup"
            element={!session ? <Signup /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/signin"
            element={!session ? <Signin /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/account"
            element={
              !session ? (
                <Signin />
              ) : (
                <>
                  <NavBar />
                  <Account key={session!.user.id} session={session} />
                </>
              )
            }
          />
          <Route
            path="/activities/:id"
            element={
              !session ? (
                <Signin />
              ) : (
                <>
                  <NavBar />
                  <ActivityPage />
                </>
              )
            }
          />
          <Route
            path="/welcome"
            element={
              !session ? (
                <Signin />
              ) : (
                <>
                  <NavBar />
                  <Homepage key={session!.user.id} session={session} />
                </>
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
