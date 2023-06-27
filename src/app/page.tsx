"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, CircularProgress, Box } from "@mui/material";
import PokemonCard from "@/app/components/PokemonCard";

interface Item {
  id: number;
  pokemon: string;
  description: string;
  author: string;
  image_url: string;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api");
      setData(result.data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {data.map((item: Item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <PokemonCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
