import * as React from "react";
import { Link, Section, Text } from "@react-email/components";
import { brand, type, url } from "../config";
import type { DispatchData } from "../fetch-data";

export function DispatchList({ dispatches }: { dispatches: DispatchData[] }) {
  return (
    <Section style={{ padding: "0 32px" }}>
      {dispatches.map((d, i) => (
        <Section key={d.slug} style={i === 0 ? firstItem : item}>
          <Text style={tag}>{d.region === "india" ? "India" : "World"}</Text>
          <Link href={url(`/dispatches/${d.slug}`)} style={title}>
            {d.title}
          </Link>
          {d.excerpt ? <Text style={excerpt}>{d.excerpt}</Text> : null}
          {d.sourceName ? <Text style={source}>{d.sourceName}</Text> : null}
        </Section>
      ))}
    </Section>
  );
}

const item: React.CSSProperties = {
  borderTop: `1px solid ${brand.line}`,
  padding: "18px 0 0",
};

const firstItem: React.CSSProperties = { padding: "0" };

const tag: React.CSSProperties = {
  margin: "0 0 8px",
  display: "inline-block",
  backgroundColor: brand.mist,
  color: brand.ink,
  fontFamily: type.body,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "5px 10px",
  borderRadius: "999px",
};

const title: React.CSSProperties = {
  display: "block",
  fontFamily: type.heading,
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  lineHeight: "1.32",
  color: brand.ink,
  textDecoration: "none",
};

const excerpt: React.CSSProperties = {
  margin: "7px 0 0",
  fontFamily: type.body,
  fontSize: "14px",
  lineHeight: "1.55",
  color: brand.inkSoft,
};

const source: React.CSSProperties = {
  margin: "8px 0 18px",
  fontFamily: type.body,
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: brand.inkFaint,
};
