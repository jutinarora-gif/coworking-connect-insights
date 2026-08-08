import * as React from "react";
import { Hr, Link, Section, Text } from "@react-email/components";
import { brand, siteUrl, type, url } from "../config";

export function Footer() {
  return (
    <Section style={wrap}>
      <Hr style={rule} />
      <Text style={mark}>TCD.</Text>
      <Text style={line}>
        The Coworking Dispatch. Real desks, real reviews, India first.
      </Text>
      <Text style={links}>
        <Link href={siteUrl} style={link}>
          coworkingdispatch.com
        </Link>
        {"  \u00b7  "}
        <Link href={url("/spaces")} style={link}>
          Spaces
        </Link>
        {"  \u00b7  "}
        <Link href={url("/winners")} style={link}>
          Winners
        </Link>
        {"  \u00b7  "}
        <Link href={url("/guides")} style={link}>
          Guides
        </Link>
      </Text>
      <Text style={fine}>
        You are getting this because you signed up at coworkingdispatch.com.
        <br />
        {/* Your sending tool replaces the tokens below with its own links. */}
        {"{{ address }}"} &nbsp;/&nbsp; {"{{ unsubscribe }}"}
      </Text>
    </Section>
  );
}

const wrap: React.CSSProperties = { padding: "8px 32px 40px" };

const rule: React.CSSProperties = {
  borderColor: brand.line,
  margin: "0 0 26px",
};

const mark: React.CSSProperties = {
  margin: "0 0 12px",
  display: "inline-block",
  backgroundColor: brand.ink,
  color: brand.paper,
  fontFamily: type.heading,
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  padding: "8px 10px",
  borderRadius: "9px",
  lineHeight: 1,
};

const line: React.CSSProperties = {
  margin: "0",
  fontFamily: type.body,
  fontSize: "13px",
  color: brand.inkSoft,
  lineHeight: "1.55",
};

const links: React.CSSProperties = {
  margin: "12px 0 0",
  fontFamily: type.body,
  fontSize: "12px",
  color: brand.inkFaint,
};

const link: React.CSSProperties = {
  color: brand.ink,
  textDecoration: "underline",
};

const fine: React.CSSProperties = {
  margin: "20px 0 0",
  fontFamily: type.body,
  fontSize: "11px",
  lineHeight: "1.7",
  color: brand.inkFaint,
};
