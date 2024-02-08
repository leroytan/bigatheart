import { useState, useEffect, SetStateAction } from "react";
import { supabase } from "../components/supabaseClient";
import { Box, Button, Grid, TextField, ThemeProvider, Toolbar } from "@mui/material";
import { lightTheme } from "../theme";

export default function Account({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState(null);

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
        data.get("firstName")?.toString()! + " " + data.get("lastName")?.toString()!,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Toolbar/>
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
        <Button type="submit" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </Box>
    </ThemeProvider>
  );
}
