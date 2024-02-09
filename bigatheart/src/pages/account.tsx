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
//the update skills is not yet working
export default function Account({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [allskills, setAllskills] = useState<Skills[] | null>(null);
  const getallskills = async () => {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) {
      alert(error.message);
    } else {
      setAllskills(data);
    }
  };
  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

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

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    const { user } = session;

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
    const skills = [
      {
        profile_id: user.id,
        skills_id: 11,
      },
    ];
    const { error: error2 } = await supabase
      .from("profile_skills")
      .upsert(skills);
    if (error) {
      alert(error.message);
    } else if (error2) {
      alert(error2.message);
    }
    setLoading(false);
  };
  const [skillselected, setskillselected] = useState<boolean[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setskillselected({
      ...skillselected,
      [event.target.name]: event.target.checked,
    });
  };

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
            value={session.user.email}
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
          allskills!.map((skills, index) => {
            return (
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={skillselected[index]}
                      onChange={handleChange}
                      name="jason"
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
