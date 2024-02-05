import { useParams } from "react-router-dom";

const ActivityPage = () => {
    const {id} = useParams();
    return ( 
        <div>{id}</div>
     );
}
 
export default ActivityPage;