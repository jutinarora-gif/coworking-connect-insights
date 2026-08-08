import * as React from "react";
import { Section, Text } from "@react-email/components";
import { brand, type } from "../config";

type Tone = "mint" | "ink";

export function Callout({
  tone,
  kicker,
  headline,
  body,
}: {
  tone: Tone;
  kicker: string;
  headline: string;
  body?: string;
}) {
  const dark = tone === "ink";
  return (
    <Section
      style={{
        margin: "0 32px",
        padding: "24px 24px 26px",
        borderRadius: "14px",
        backgroundColor: dark ? brand.ink : brand.mint,
      }}
    >
      <Text
        style={{
          margin: "0 0 10px",
          fontFamily: type.body,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: dark ? brand.mint : brand.ink,
        }}
      >
        {kicker}
      </Text>
      <Text
        style={{
          margin: 0,
          fontFamily: type.heading,
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: "1.35",
          color: dark ? brand.paper : brand.ink,
        }}
      >
        {headline}
      </Text>
      {body ? (
        <Text
          style={{
            margin: "12px 0 0",
            fontFamily: type.body,
            fontSize: "14px",
            lineHeight: "1.6",
            color: dark ? "#c9c9c0" : "#1f3d1e",
          }}
        >
          {body}
        </Text>
      ) : null}
    </Section>
  );
}
