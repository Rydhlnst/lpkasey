import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type NewsletterSignupEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export function NewsletterSignupEmail({
  firstName,
  lastName,
  email,
}: NewsletterSignupEmailProps) {
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Html lang="en">
      <Head />
      <Preview>New newsletter signup from {firstName} {lastName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={title}>New Newsletter Signup</Heading>
          <Text style={text}>
            You have a new signup from the website CTA form.
          </Text>
          <Section style={detailBox}>
            <Text style={row}><strong>Name:</strong> {firstName} {lastName}</Text>
            <Text style={row}><strong>Email:</strong> {email}</Text>
            <Text style={row}><strong>Submitted at:</strong> {submittedAt}</Text>
          </Section>
          <Hr style={divider} />
          <Text style={footnote}>
            This message was generated automatically by the website contact flow.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f3f4f6",
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: 0,
  padding: "24px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  margin: "0 auto",
  maxWidth: "620px",
  padding: "28px",
};

const title = {
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const text = {
  color: "#334155",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 16px",
};

const detailBox = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  padding: "12px 14px",
};

const row = {
  color: "#0f172a",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "20px 0 14px",
};

const footnote = {
  color: "#64748b",
  fontSize: "12px",
  lineHeight: "18px",
  margin: 0,
};

