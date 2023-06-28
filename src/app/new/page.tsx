"use client";
import React from "react";
import { useState } from "react";
import { Container, TextField, Button, Box } from "@mui/material";
import Select from "react-select";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Pokemons from "@/json/all_pokemons.json";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const all_pokemons = Pokemons.map((data) => {
  return { value: data, label: data.name };
});

const Page = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("silhouette.jpg");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePokemon = (event: any) => {
    setPokemon(event.value.name);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${event.value.id}`)
      .then((res) => {
        setPokemonImageUrl(
          res.data.sprites.other["official-artwork"].front_default
        );
      })
      .catch((err) => console.error(err));
  };

  const isButtonDisabled =
    !description.trim() || !author.trim() || !pokemon || isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api",
        {
          pokemon: pokemon,
          description: description,
          image_url: pokemonImageUrl,
          author: author,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/");
      toast.success("投稿しました！");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {pokemonImageUrl && (
        <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={pokemonImageUrl}
            alt="pokemon"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </Box>
      )}
      <Select
        options={all_pokemons}
        placeholder="ポケモンを選ぶ！（カタカナで絞り込めます！）"
        isSearchable={true}
        onChange={handlePokemon}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPlacement="top"
      />
      <TextField
        fullWidth
        label="推しポイントを入力してね！"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="きみの名前を教えて！"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="outlined"
        color="success"
        disabled={isButtonDisabled}
        style={{ marginTop: "1rem" }}
        endIcon={<SendIcon />}
        onClick={handleSubmit}
      >
        キミにきめた!
      </Button>
    </Container>
  );
};

export default Page;
