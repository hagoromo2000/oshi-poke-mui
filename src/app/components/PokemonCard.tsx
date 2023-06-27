import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Box,
} from "@mui/material";
import { TwitterIntentTweet } from "@/lib/TwitterIntentTweet";
import TwitterIcon from "@mui/icons-material/Twitter";

interface Item {
  id: number;
  pokemon: string;
  description: string;
  author: string;
  image_url: string;
}

interface PokemonCardProps {
  item: Item;
}

const PokemonCard = ({ item }: PokemonCardProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 275, height: 400 }}>
        <CardMedia
          component="img"
          alt={item.pokemon}
          height="140"
          image={item.image_url}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.pokemon}{" "}
            <TwitterIntentTweet
              className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              text={`私の推しポケモンは${item.pokemon}!`}
              url={window.location.href}
              hashtags={["私の推しポケモン"]}
            >
              <TwitterIcon color="primary" />
            </TwitterIntentTweet>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            {item.author}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PokemonCard;
