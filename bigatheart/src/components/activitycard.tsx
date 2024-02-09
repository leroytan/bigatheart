import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Activity } from "../types/activities";
import { supabase } from "./supabaseClient";
import { useContext } from "react";
import { UserSession } from "../App";

const Activitycard = (prop: { activity: Activity; joined: boolean }) => {
  const session = useContext(UserSession);
  const joinactivity = async () => {
    const { error } = await supabase.rpc("upsert_user_activities", {
      profile: session?.user.id,
      activity: prop.activity.id,
    });

    if (error) {
      console.log("failed to join");
    } else {
      console.log("user has joined");
      window.location.reload();
    }
  };
  return (
    <>
      <Card sx={{ width: 350, maxWidth: 350 }}>
        <CardActionArea
          component={Link}
          to={`/activities/${prop.activity.id}`}
          sx={{ height: 250 }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://static.wixstatic.com/media/f6709c_ae0eff62dc8c41ddb6539b0c222d7bc9~mv2.png/v1/fill/w_1216,h_685,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/Labour%20Day%20Charity%20Walk%202023%20(Facebook%20Cover)%20V2.png"
            alt={prop.activity.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {prop.activity.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {prop.activity.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          {!prop.joined && (
            <Button size="small" color="primary" onClick={joinactivity}>
              Join!
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Activitycard;
