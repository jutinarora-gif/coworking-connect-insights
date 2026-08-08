import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { brand, type, url } from "./config";
import type { IssueData } from "./fetch-data";
import { Masthead } from "./components/masthead";
import { SectionHeading } from "./components/section-heading";
import { SpaceCard } from "./components/space-card";
import { WinnerList } from "./components/winner-list";
import { DispatchList } from "./components/dispatch-list";
import { Callout } from "./components/callout";
import { Footer } from "./components/footer";

export type DispatchEmailProps = {
  preheader: string;
  dateLabel: string;
  issueNumber: number;
  editorsNote: string;
  signature: { name: string; role: string };
  data: IssueData;
};

export function DispatchEmail({
  preheader,
  dateLabel,
  issueNumber,
  editorsNote,
  signature,
  data,
}: DispatchEmailProps) {
  const paragraphs = editorsNote.split(/\n{2,}/).filter(Boolean);

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{preheader}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Masthead dateLabel={dateLabel} issueNumber={issueNumber} />

          {/* Editor's note */}
          <Section style={{ padding: "30px 32px 4px" }}>
            {paragraphs.map((p, i) => (
              <Text key={i} style={i === 0 ? leadPara : para}>
                {p}
              </Text>
            ))}
            <Text style={sign}>
              {signature.name}
              <br />
              <span style={signRole}>{signature.role}</span>
            </Text>
          </Section>

          <Gap />

          {data.spaceOfWeek ? (
            <>
              <SectionHeading>Space of the week</SectionHeading>
              <SpaceCard space={data.spaceOfWeek} />
              <Gap />
            </>
          ) : null}

          {data.winners.length ? (
            <>
              <SectionHeading>This week's winners</SectionHeading>
              <WinnerList winners={data.winners} />
              <Gap />
            </>
          ) : null}

          {data.dispatches.length ? (
            <>
              <SectionHeading>Latest dispatches</SectionHeading>
              <DispatchList dispatches={data.dispatches} />
              <Section style={{ padding: "4px 32px 0" }}>
                <Button href={url("/dispatches")} style={ghostCta}>
                  Read every dispatch
                </Button>
              </Section>
              <Gap />
            </>
          ) : null}

          <Callout
            tone="mint"
            kicker="Ask your salesperson this"
            headline={data.salesQuestion}
          />
          <Gap />

          <Callout
            tone="ink"
            kicker="Red flag of the week"
            headline={data.redFlag.flag}
            body={data.redFlag.why}
          />
          <Gap />

          <SectionHeading>One guide worth your time</SectionHeading>
          <Section style={{ padding: "0 32px" }}>
            <Link href={url(data.guide.path)} style={guideTitle}>
              {data.guide.title}
            </Link>
            <Text style={guidePromise}>{data.guide.promise}</Text>
          </Section>

          <Section style={{ padding: "34px 32px 0" }}>
            <Hr style={{ borderColor: brand.line, margin: 0 }} />
          </Section>

          <Section style={{ padding: "26px 32px 6px" }}>
            <Text style={ctaHeadline}>Been somewhere worth talking about?</Text>
            <Text style={para}>
              One honest review saves the next founder a bad six-month lock-in.
            </Text>
            <Button href={url("/spaces")} style={darkCta}>
              Leave a review
            </Button>
          </Section>

          <Gap />
          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

function Gap() {
  return <Section style={{ height: "36px", lineHeight: "36px" }}>&nbsp;</Section>;
}

const main: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: 0,
  padding: "0 0 40px",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: brand.paper,
};

const leadPara: React.CSSProperties = {
  margin: "0 0 16px",
  fontFamily: type.body,
  fontSize: "17px",
  lineHeight: "1.6",
  color: brand.ink,
};

const para: React.CSSProperties = {
  margin: "0 0 16px",
  fontFamily: type.body,
  fontSize: "15px",
  lineHeight: "1.65",
  color: brand.inkSoft,
};

const sign: React.CSSProperties = {
  margin: "22px 0 0",
  fontFamily: type.heading,
  fontSize: "14px",
  fontWeight: 600,
  color: brand.ink,
  lineHeight: "1.5",
};

const signRole: React.CSSProperties = {
  fontFamily: type.body,
  fontSize: "11px",
  fontWeight: 400,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: brand.inkFaint,
};

const ghostCta: React.CSSProperties = {
  display: "inline-block",
  border: `1px solid ${brand.ink}`,
  color: brand.ink,
  fontFamily: type.body,
  fontSize: "13px",
  fontWeight: 600,
  padding: "11px 20px",
  borderRadius: "999px",
  textDecoration: "none",
};

const darkCta: React.CSSProperties = {
  display: "inline-block",
  marginTop: "6px",
  backgroundColor: brand.ink,
  color: brand.paper,
  fontFamily: type.body,
  fontSize: "13px",
  fontWeight: 600,
  padding: "12px 20px",
  borderRadius: "999px",
  textDecoration: "none",
};

const ctaHeadline: React.CSSProperties = {
  margin: "0 0 8px",
  fontFamily: type.heading,
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.025em",
  lineHeight: "1.25",
  color: brand.ink,
};

const guideTitle: React.CSSProperties = {
  display: "block",
  fontFamily: type.heading,
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: brand.ink,
  textDecoration: "none",
  lineHeight: "1.3",
};

const guidePromise: React.CSSProperties = {
  margin: "8px 0 0",
  fontFamily: type.body,
  fontSize: "15px",
  lineHeight: "1.6",
  color: brand.inkSoft,
};
