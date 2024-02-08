import { Key, useContext, useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient";
import { User } from "../types/user";
import { Activity } from "../types/activities";
import Activitycard from "../components/activitycard";
import { Stack, Toolbar } from "@mui/material";
import { Userinfo } from "../App";

const Homepage = ({ session }: any) => {
  const user = useContext(Userinfo);
  const [enrolledactivities, setEnrolledActivities] = useState<
    Activity[] | null
  >(null);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const getactivities = async () => {
      const { data: activities } = await supabase
        .from("activities")
        .select()
        .order("created_at", { ascending: false });

      setActivities(activities);
    };
    getactivities();

    const getenrolledactivities = async () => {
      const { data: enrolledactivities } = await supabase
        .from("profiles")
        .select("activities(*)")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single();
      const activities: Activity[] | null = enrolledactivities
        ? enrolledactivities.activities
        : null;
      setEnrolledActivities(activities);
    };
    getenrolledactivities();
    setLoading(false);
  }, []);
  return (
    <>
    <Toolbar/>
      <h1>Welcome {user?.username}</h1>
      {fetchError && <p>{fetchError}</p>}
      {!activities && !loading && <div>No Activites available</div>}
      {!activities && loading && <div>Loading...</div>}
      <h2>Your enrolled activities</h2>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {enrolledactivities &&
          enrolledactivities.map((activity, index) => (
            <Activitycard key={index} activity={activity} joined={true} />
          ))}
      </Stack>
      <h2>Explore more activities!</h2>
      {/*Activity cards*/}
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {activities &&
          activities.map((activity, index) => (
            <Activitycard key={index} activity={activity} joined={false} />
          ))}
      </Stack>
      {/*End of Activity cards*/}
    </>
  );
};

export default Homepage;
