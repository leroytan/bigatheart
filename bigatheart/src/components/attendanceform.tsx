import { Box, Button, Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { supabase } from "./supabaseClient";
import { useContext, useState } from "react";
import { Userinfo } from "../App";
import { Activity } from "../types/activities";

const Attendanceform = (props: { activity: Activity | null }) => {
  const user = useContext(Userinfo);
  const [starttime, setStarttime] = useState(null);
  const [endtime, setEndtime] = useState(null);
  const [error, setError] = useState<string|null>(null)
  const submitattendance = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (starttime==null || endtime ==null){
        setError("All fields must be filled")
        return
    }
    const { data: data1, error } = await supabase.from("attendance").insert({
      profile: user!.id,
      activity: props.activity!.id,
      starttime: starttime,
      endtime: endtime,
      status: "pending",
    });
    if (error) {
      alert(error.message);
    } else {
        window.location.reload();
    }
  };
  return (
    <>
      {!user && <div> You are not logged in</div>}
      {user && (
        <Box
          component="form"
          noValidate
          onSubmit={submitattendance}
          sx={{ mt: 1 }}
          justifyItems={"flex-start"}
        >
            <Grid container margin={1}>
            <Grid item xs={4}>
          Start time: 
          <DateTimePicker
            value={starttime}
            onChange={(newValue) => setStarttime(newValue)}
          />
          </Grid>
          
          <Grid item xs={4}>
          End time: 
          <DateTimePicker
            value={endtime}
            onChange={(newValue) => setEndtime(newValue)}
          />
          </Grid>
          <br/>
          {error}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Attendanceform;
