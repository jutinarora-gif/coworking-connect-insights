import * as React from "react";
import { Button, Img, Section, Text } from "@react-email/components";
import { brand, type, url } from "../config";
import type { SpaceCardData } from "../fetch-data";

export function SpaceCard({ space }: { space: SpaceCardData }) {
  const link = url(`/spaces/${space.slug}`);
  const price =
    space.priceFrom != null
      ? `${space.currency === "INR" ? "\u20b9" : space.currency + " "}${space.priceFrom.toLocaleString("en-IN")} / month`
      : null;

  return (
    <Section style={card}>
      {space.coverUrl ? (
        <Img src={space.coverUrl} alt={space.name} width="536" style={cover} />
      ) : null}
      <Section style={body}>
        <Text style={title}>{space.name}</Text>
        <Text style={meta}>
          {[space.city, price].filter(Boolean).join("  \u00b7  ")}
        </Text>
        {space.note ? <Text style={note}>{space.note}</Text> : null}
        <Button href={link} style={cta}>
          Read the write-up
        </Button>
      </Section>
    </Section>
  );
}

const card: React.CSSProperties = {
  margin: "0 32px",
  border: `1px solid ${brand.line}`,
  borderRadius: "14px",
  overflow: "hidden",
  backgroundColor: brand.white,
};

const cover: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
  objectFit: "cover",
};

const body: React.CSSProperties = { padding: "22px 22px 24px" };

const title: React.CSSProperties = {
  margin: "0",
  fontFamily: type.heading,
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "-0.025em",
  lineHeight: "1.15",
  color: brand.ink,
};

const meta: React.CSSProperties = {
  margin: "8px 0 0",
  fontFamily: type.body,
  fontSize: "12px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: brand.inkFaint,
};

const note: React.CSSProperties = {
  margin: "14px 0 0",
  fontFamily: type.body,
  fontSize: "15px",
  lineHeight: "1.6",
  color: brand.inkSoft,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  marginTop: "20px",
  backgroundColor: brand.ink,
  color: brand.paper,
  fontFamily: type.body,
  fontSize: "13px",
  fontWeight: 600,
  padding: "12px 20px",
  borderRadius: "999px",
  textDecoration: "none",
};
