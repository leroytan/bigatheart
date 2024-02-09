import { Activity } from "../types/activities";
import Attendanceform from "./attendanceform";
import Attendancelist from "./attendancelist";

const Attendance = (props: { activity: Activity | null }) => {
  
  return (
    <>
      <Attendanceform activity={props.activity} />
      <Attendancelist activity={props.activity}/>
    </>
  );
};

export default Attendance;
