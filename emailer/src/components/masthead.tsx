import * as React from "react";
import { Column, Row, Section, Text } from "@react-email/components";
import { brand, type } from "../config";

export function Masthead({ dateLabel, issueNumber }: { dateLabel: string; issueNumber: number }) {
  return (
    <Section style={wrap}>
      <Row>
        <Column>
          <Text style={mark}>TCD.</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text style={name}>The Coworking Dispatch</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text style={meta}>
            Issue {String(issueNumber).padStart(2, "0")} &nbsp;/&nbsp; {dateLabel}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

const wrap: React.CSSProperties = {
  padding: "32px 32px 24px",
  borderBottom: `1px solid ${brand.line}`,
};

const mark: React.CSSProperties = {
  margin: "0 0 14px",
  display: "inline-block",
  backgroundColor: brand.ink,
  color: brand.paper,
  fontFamily: type.heading,
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: "1",
  padding: "10px 12px",
  borderRadius: "10px",
};

const name: React.CSSProperties = {
  margin: "0",
  fontFamily: type.heading,
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: brand.ink,
  lineHeight: "1.2",
};

const meta: React.CSSProperties = {
  margin: "6px 0 0",
  fontFamily: type.body,
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: brand.inkFaint,
};
