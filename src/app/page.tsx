import Link from "next/link";
import { Box, Container, Typography, Button } from "@mui/material";

export default async function HomePage() {
  return (
    <>Home Page</>
    // <Container maxWidth="md">
    //   {/* <Box
    //     sx={{
    //       minHeight: "60vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       gap: 3,
    //       textAlign: "center",
    //       py: 8,
    //     }}
    //   >
    //     <Typography variant="h3" component="h1">
    //       ScrollBooker
    //     </Typography>

    //     <Typography variant="body1" color="text.secondary">
    //       Bine ai venit! Aceasta este pagina principală publică. Pentru a intra
    //       în zona administrativă apasă butonul de mai jos.
    //     </Typography>

    //     <Box sx={{ display: "flex", gap: 2 }}>
    //       <Link href="/admin">
    //         <Button variant="contained" color="primary">
    //           Admin
    //         </Button>
    //       </Link>
    //     </Box>
    //   </Box> */}
    // </Container>
  );
}
