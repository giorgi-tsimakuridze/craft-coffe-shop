import styled from "styled-components";
import { PrimaryButton, colors, Container } from "../components/SharedStyles";
import HomeImage from "../assets/home.jpg";

const HeroSection = styled.div`
  background:
    linear-gradient(${colors.darkOverlay}, ${colors.darkOverlay}),
    url(${HomeImage});
  background-size: cover;
  background-position: center;
  color: ${colors.white};
  padding: 150px 0;
  margin-bottom: 50px;
`;

const HeroContent = styled(Container)`
  padding-left: 50px;
  h2 {
    font-family: "Inter";
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 5px;
    color: #b0b0b0;
  }
  h1 {
    font-family: "High Tower Text";
    font-size: 5rem;
    font-weight: 900;
    margin: 0;
    color: ${colors.white};
    border-bottom: 5px solid ${colors.accent};
    padding-bottom: 10px;
    max-width: 500px;
  }
  p {
    font-family: "Inter";
    font-size: 1rem;
    margin-top: 15px;
    color: #e0e0e0;
  }
`;

export default function Home() {
  return (
    <HeroSection>
      <HeroContent>
        <h2>SIMPLY CLEVER</h2>
        <h1>BEST COFFEE</h1>
        <p>Lorem Ipsum Dolor met sit dolor</p>
        <PrimaryButton
          as="a"
          href="/coffees"
          style={{
            marginTop: "30px",
            background: colors.white,
            color: colors.primary,
          }}
        >
          View Menu
        </PrimaryButton>
      </HeroContent>
    </HeroSection>
  );
}
