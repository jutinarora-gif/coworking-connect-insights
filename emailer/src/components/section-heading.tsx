import * as React from "react";
import { Section, Text } from "@react-email/components";
import { brand, type } from "../config";

/** A section label: mint dot, then the label in small caps. */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Section style={{ padding: "0 32px", margin: "0" }}>
      <Text style={label}>
        <span style={dot} />
        {children}
      </Text>
    </Section>
  );
}

const label: React.CSSProperties = {
  margin: "0 0 14px",
  fontFamily: type.body,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: brand.ink,
};

const dot: React.CSSProperties = {
  display: "inline-block",
  width: "8px",
  height: "8px",
  borderRadius: "8px",
  backgroundColor: brand.mint,
  marginRight: "9px",
  verticalAlign: "middle",
};
