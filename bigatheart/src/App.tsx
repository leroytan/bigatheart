import { createContext, useEffect, useState } from "react";
import { supabase } from "./components/supabaseClient";
import Account from "./pages/account";
import { Session } from "@supabase/supabase-js";
import Signin from "./components/signin";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import NavBar from "./components/navbar";
import Homepage from "./pages/homepage";
import ActivityPage from "./pages/activitypage";
import { User } from "./types/user";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
export const UserSession = createContext<Session | null>(null);
export const Userinfo = createContext<User | null>(null);
function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const getuser = async () => {
    const { data: userdata, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", (await supabase.auth.getUser()).data.user?.id)
      .single();

    if (error) {
      setUser(null);
    }
    if (userdata) {
      setUser(userdata);
    }
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      getuser();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      getuser();
    });
  }, []);

  return (
    <UserSession.Provider value={session}>
      <Userinfo.Provider value={user}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
      </Userinfo.Provider>
    </UserSession.Provider>
  );
}

export default App;
