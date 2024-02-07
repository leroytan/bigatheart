import { useParams } from "react-router-dom";
import Sidenavbar from "../components/sidenavbar";
import Account from "./account";
import Homepage from "./homepage";
import Announcements from "../components/announcement";
import { useState } from "react";

const ActivityPage = () => {
  const { id } = useParams();
  const [pagenumber, setPageNumber] = useState(0);
  const changepagenumber = (number : number)=>{
    setPageNumber(number);
  }
  return (
    <>
      <Sidenavbar changepagenumber = {changepagenumber}>
      {pagenumber==0 && <Announcements id = {id!}/>}
      </Sidenavbar>
    </>
  );
};

export default ActivityPage;
