"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography variant="h6" component="div">
                推しポケ！
              </Typography>
            </Link>
          </div>
          <Link href="/new" passHref>
            <button className="bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded transition duration-500 ease-in-out hover:bg-yellow-600 transform hover:-translate-y-1 hover:scale-110">
              推しを投稿する！
            </button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
