import { useContext } from "react";
import CertificateGenerator from "./CertificateGenerator";
import { Activity } from "../types/activities";
import { Userinfo } from "../App";
const CertificateViewer = (props: {activity: Activity|null}) => {
  const user = useContext(Userinfo)
  return (
    <>
    {!user&& <div>User not found</div>}
    {user && props.activity && <CertificateGenerator name={user!.username} activity={props.activity!.title} hour="5" />}
    </>
  );
};

export default CertificateViewer;
