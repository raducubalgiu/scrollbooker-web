import { Box, Typography } from "@mui/material";

type EmploymentRespondParagraphsProps = {
  employerFullName: string;
};

const EmploymentRespondParagraphs = ({
  employerFullName,
}: EmploymentRespondParagraphsProps) => {
  const paragraphs = [
    "Vei primi acces la propriul tău calendar și programări.",
    `Vei putea edita și adăuga servicii în cadrul salonului ${employerFullName}.`,
    "Clienții te vor putea selecta direct în funcție de disponibilitatea ta.",
    "Vei apărea în profilul public al salonului.",
    "Vei primi recenzii de la clienții tăi.",
    "Te poți retrage/demisiona oricând.",
  ];

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        Iată ce ar trebui să știi
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Prin acceptarea acestei cereri:
      </Typography>

      {paragraphs.map((text, index) => (
        <Box key={index} sx={styles.container}>
          <Box sx={styles.paragraphContainer} />
          <Typography color="text.secondary">{text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default EmploymentRespondParagraphs;

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: 1.5,
    mt: 1.5,
  },
  paragraphContainer: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    bgcolor: "text.primary",
    mt: "10px",
    flexShrink: 0,
  },
};
