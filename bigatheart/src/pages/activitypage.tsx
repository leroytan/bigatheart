import { useParams } from "react-router-dom";
import Sidenavbar from "../components/sidenavbar";
import Announcements from "../components/announcement";
import { useEffect, useState } from "react";
import CertificateViewer from "../components/certificateviewer";
import { supabase } from "../components/supabaseClient";
import { Activity } from "../types/activities";
import { Toolbar } from "@mui/material";

const ActivityPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string|null>(null)
  const [activity, setActivity] = useState<Activity | null>(null);
  const { id } = useParams();
  const [pagenumber, setPageNumber] = useState(0);
  const changepagenumber = (number : number)=>{
    setPageNumber(number);
  }
  useEffect(() => {
    setLoading(true);
    const getactivities = async () => {
      const { data: activities } = await supabase
        .from("activities")
        .select()
        .eq("id", id)
        .single()
        
      setActivity(activities);
    };
    getactivities();
  },[])
  return (
    <>
      <Sidenavbar changepagenumber = {changepagenumber}>
      {pagenumber==0 && <Announcements id = {id!}/>}
      {pagenumber==2 && <CertificateViewer activity={activity}/>}
      </Sidenavbar>
    </>
  );
};

export default ActivityPage;
