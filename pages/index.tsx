import { Container, Text } from "@nextui-org/react";

const Index = () => {
  return (
    <Container
      css={{
        width: "100%",
        padding: "8px",
        textAlign: "center",
      }}
    >
      <Text
        small
        weight="medium"
        css={{
          color: "white",
          textGradient: "45deg, $yellow500 -20%, $red500 100%",
        }}
      >
        Desma: a design system manager
      </Text>
      {" 🚀"}
    </Container>
  );
};

export default Index;
