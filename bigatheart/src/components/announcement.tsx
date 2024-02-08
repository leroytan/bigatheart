import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Announcement } from "../types/announcements";
import { Card, CardContent, Typography } from "@mui/material";

const Announcements = (prop: { id: string }) => {
  const [announcement, setAnnouncement] = useState<Announcement[] | null>(null);
  useEffect(() => {
    const getannouncments = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("activity", prop.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.message);
      } else {
        setAnnouncement(data);
      }
    };
    getannouncments();
  }, []);
  return (
    <>
      {announcement == null && (
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Loading...
        </Typography>
      )}
      {announcement?.length == 0 && (
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          There are no announcements.
        </Typography>
      )}
      {announcement &&
        announcement.map((announcement) => {
          return (
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {announcement.title}
                </Typography>
                <Typography>{announcement.description}</Typography>
                <Typography>{new Date(announcement.created_at).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          );
        })}
    </>
  );
};

export default Announcements;
