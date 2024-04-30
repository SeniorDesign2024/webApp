import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FoundersList from "../components/FoundersList";
import Summary from "../components/Summary";
import FeaturesList from "../components/FeaturesList";
import Audience from "../components/Audience";
import TechnologyMethodology from "../components/TechnologyMethodology";
import ImageSection from "../components/ImageSection";
import ContactInfo from "../components/ContactInfo";
import logo from "../logo2.png";

/**
 * Component for rendering the About page
 * @returns {JSX.Element} AboutPage component
 */
const AboutPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: `linear-gradient(to right, #3A0CA3, #3A0CA3 50%, #3A0CA3 50%, #3A0CA3 50%, #3A0CA3)`,
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <Container
        component="main"
        maxWidth="md"
        sx={{
          background: '#ffffff',
          padding: '20px',
          border: '2px solid #3A0CA3',
          borderRadius: '8px',
        }}
      >
        <img src={logo} alt="logo" height={"100"} width={"100"} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#3A0CA3', textAlign: 'center' }}>
          Event Attendance Tracking with AI
        </Typography>
        <Box my={2}>
          <FoundersList />
        </Box>
        <Box my={2}>
          <ImageSection />
        </Box>
        <Box my={2}>
          <Summary />
        </Box>
        <Box my={2}>
          <FeaturesList />
        </Box>
        <Box my={2}>
          <Audience />
        </Box>
        <Box my={2}>
          <TechnologyMethodology />
        </Box>
        <Box my={2}>
          <ContactInfo />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
