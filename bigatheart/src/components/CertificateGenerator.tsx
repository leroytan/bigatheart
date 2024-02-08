import React from "react";
import jsPDF from "jspdf";
import img from "../assets/certificate-background.png";
import { Box, Button, TextField, Typography } from "@mui/material";

const generateCertificate = (
  name: string | string[],
  course: string | string[],
  hour: string
) => {
  // Create a new jsPDF instance
  const doc = new jsPDF({ orientation: "landscape" });

  // Add background image
  doc.addImage(
    img,
    "PNG",
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight()
  );

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont("helvetica"); // Change the font family and style
  doc.text(name, 150, 100, { align: "center" }); // 105 and 160: horizontal and vertical positions of the text

  // Add hour
  doc.setFontSize(20);
  doc.text(hour, 160, 115, { align: "center" }); // 105 and 195: horizontal and vertical positions of the text

  //Add course name
  doc.setFontSize(30);
  doc.text(course, 150, 130, { align: "center" });
  // Save the PDF
  window.open(doc.output("bloburl"));

  //doc.output(`${name}-${course}.pdf`);
};

function CertificateGenerator(props: {
  name: string;
  activity: string;
  hour: string;
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 3 },
      }}
      noValidate
      autoComplete="off"
    >
      <Box display="flex" alignItems="center">
        <Typography>Name: </Typography>
        <TextField fullWidth disabled value={props.name} />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>Hour: </Typography>
        <TextField fullWidth disabled value={props.hour} />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>Activity: </Typography>
        <TextField fullWidth disabled value={props.activity} />
      </Box>
      <Typography>To change name, please update your profile</Typography>
      <Button
        onClick={() =>
          generateCertificate(props.name, props.activity, props.hour)
        }
      >
        Generate Certificate
      </Button>
    </Box>
  );
}

export default CertificateGenerator;
