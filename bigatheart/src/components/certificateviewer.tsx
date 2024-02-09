import { useContext, useEffect, useState } from "react";
import CertificateGenerator from "./CertificateGenerator";
import { Activity } from "../types/activities";
import { Userinfo } from "../App";
import { Attendance } from "../types/attendance";
import { supabase } from "./supabaseClient";
const CertificateViewer = (props: { activity: Activity | null }) => {
  const user = useContext(Userinfo);
  const [attendances, setAttendances] = useState<Attendance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const getattendance = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("profile", user!.id)
      .eq("activity", props.activity!.id);
    if (error) {
      alert(error.message);
    } else {
      setAttendances(data);
    }
  };
  const getsum = (attendances : Attendance[])=>{
    var sum = 0;  
    for (var i=0; i<attendances.length; i++){
        sum += Math.round(
          ((new Date(attendances[i].endtime).valueOf() - new Date(attendances[i].starttime).valueOf()) /
            (1000 * 60 * 60)) *
            10
        ) / 10
      }
      return sum;
  }
  useEffect(() => {
    setLoading(true);
    getattendance();
    setLoading(false);
  }, []);
  return (
    <>
      {!user && <div>User not found</div>}
      {user && props.activity && attendances &&(
        <CertificateGenerator
          name={user!.username}
          activity={props.activity!.title}
          hour={getsum(attendances!).toString()}
        />
      )}
    </>
  );
};

export default CertificateViewer;
