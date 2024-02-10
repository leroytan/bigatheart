import { useState, useEffect, SetStateAction } from "react";
import { supabase } from "../components/supabaseClient";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { lightTheme } from "../theme";
import { Skills } from "../types/skills";
import { Session } from "@supabase/supabase-js";
//the update skills is not yet working
export default function Account(props: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [allskills, setAllskills] = useState<Skills[] | null>(null);
  const [userskills, setUserskills] = useState<any[] | null>(null);
  const getallskills = async () => {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) {
      alert(error.message);
    } else {
      setAllskills(data);
    }
  };
  const getuserskills = async () => {
    const { data, error } = await supabase
      .from("profile_skills")
      .select("*")
      .eq("profile_id", props.session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setUserskills(data);
    }
  };
  const deletepreviousskills = async () => {
    const { error } = await supabase
      .from("profile_skills")
      .delete()
      .eq("profile_id", props.session.user.id);
      if (error){
        alert(error.message);
      }
  };
  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = props.session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();
    getallskills();
    getuserskills();

    return () => {
      ignore = true;
    };
  }, [props.session]);
  useEffect(() => {
    setSelected(
      userskills
        ? userskills!.map(({ skills_id }) => {
            return skills_id;
          })
        : []
    );
  }, [userskills]);
  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    const { user } = props.session;

    const updates = {
      id: user.id,
      username:
        data.get("firstName")?.toString()! +
        " " +
        data.get("lastName")?.toString()!,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);
    await deletepreviousskills(); //deletes the record before we insert the new ones
    const skills = selected.map((skillid) => {
      return {
        profile_id: user.id,
        skills_id: skillid,
      };
    });
    
    const { error: error2 } = await supabase
      .from("profile_skills")
      .upsert(skills);
    if (error) {
      alert(error.message);
    } else if (error2) {
      alert(error2.message);
    }
    setLoading(false);
    window.location.reload();
  };
  //for the checkboxes
  const [selected, setSelected] = useState<number[]>([]);
  const handlechange = (id: number) => {
    var temp = selected.slice();
    if (selected.includes(id)) {
      temp = temp.filter((idinarray) => idinarray != id);
      setSelected(temp);
    } else {
      temp.push(id);
      setSelected(temp);
    }
    console.log(temp);
  };
  //end of checkboxes

  return (
    <ThemeProvider theme={lightTheme}>
      <Toolbar />
      <Box component="form" noValidate onSubmit={updateProfile} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            value={props.session.user.email}
            hiddenLabel
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <br />
        <Divider />
        Select your skills!
        {allskills &&
          allskills!.map((skills) => {
            return (
              <Grid item xs={12} sm={6} key={skills.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selected.includes(Number(skills.id))}
                      onChange={() => handlechange(Number(skills.id))}
                      name={skills.id}
                    />
                  }
                  label={skills.title}
                />
              </Grid>
            );
          })}
        <Button type="submit" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </Box>
    </ThemeProvider>
  );
}
