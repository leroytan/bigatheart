import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { supabase } from "./supabaseClient";
import { Activity } from "../types/activities";
import { Userinfo } from "../App";
import { useContext, useEffect, useState } from "react";
import { Attendance } from "../types/attendance";

const Attendancelist = (props: { activity: Activity | null }) => {
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
  useEffect(() => {
    setLoading(true);
    getattendance();
    setLoading(false);
  }, []);
  const columns: GridColDef[] = [
    { field: "created_at", headerName: "Submitted on", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "hours", headerName: "Hours", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    user &&
    attendances && (
      <DataGrid
        rows={attendances.map(
          ({ id, created_at, starttime, endtime, status }) => ({
            id,
            created_at: new Date(created_at).toDateString(),
            date:
              new Date(starttime).toLocaleDateString() ===
              new Date(endtime).toLocaleDateString()
                ? new Date(starttime).toLocaleDateString()
                : new Date(starttime).toLocaleDateString() +
                  "-" +
                  new Date(endtime).toLocaleDateString(),
            time:
              new Date(starttime).toLocaleTimeString() +
              "-" +
              new Date(endtime).toLocaleTimeString(),
            hours:
              Math.round(
                ((new Date(endtime).valueOf() - new Date(starttime).valueOf()) /
                  (1000 * 60 * 60)) *
                  10
              ) / 10,

            status,
          })
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        checkboxSelection
        loading={loading}
      />
    )
  );
};

export default Attendancelist;
