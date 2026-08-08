import * as React from "react";
import { Column, Link, Row, Section, Text } from "@react-email/components";
import { brand, type, url } from "../config";
import type { WinnerData } from "../fetch-data";

export function WinnerList({ winners }: { winners: WinnerData[] }) {
  return (
    <Section style={{ padding: "0 32px" }}>
      {winners.map((w, i) => (
        <Row key={w.slug} style={i === 0 ? firstRow : row}>
          <Column style={rankCell}>
            <Text style={rank}>{String(w.rank).padStart(2, "0")}</Text>
          </Column>
          <Column>
            <Link href={url(`/spaces/${w.slug}`)} style={name}>
              {w.name}
            </Link>
            <Text style={meta}>
              {[w.city, `${w.score.toFixed(1)} score`].filter(Boolean).join("  \u00b7  ")}
            </Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

const row: React.CSSProperties = {
  borderTop: `1px solid ${brand.line}`,
};

const firstRow: React.CSSProperties = {};

const rankCell: React.CSSProperties = {
  width: "56px",
  verticalAlign: "top",
  paddingTop: "16px",
};

const rank: React.CSSProperties = {
  margin: 0,
  fontFamily: type.heading,
  fontSize: "22px",
  fontWeight: 700,
  color: brand.ink,
  letterSpacing: "-0.02em",
  lineHeight: "1",
};

const name: React.CSSProperties = {
  display: "inline-block",
  paddingTop: "14px",
  fontFamily: type.heading,
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  color: brand.ink,
  textDecoration: "none",
  lineHeight: "1.3",
};

const meta: React.CSSProperties = {
  margin: "4px 0 16px",
  fontFamily: type.body,
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: brand.inkFaint,
};
