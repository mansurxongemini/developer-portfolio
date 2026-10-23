import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";

// Once UI components stay available for MDX bodies that explicitly
// reference them by name (legacy demo posts). Default HTML tags below
// render as plain dossier prose — no Once UI chrome on public pages.
import {
  Accordion,
  AccordionGroup,
  Button,
  Card,
  CodeBlock,
  Column,
  Feedback,
  Grid,
  Heading,
  Icon,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  Row,
  SmartLink,
  Table,
  Text,
} from "@once-ui-system/core";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: { alt?: string; src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ""} loading="lazy" {...props} />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return textOf(props.children);
  }
  return "";
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: { children?: ReactNode }) => {
    const slug = slugify(textOf(children));
    const Tag = as as "h1";
    return (
      <Tag id={slug || undefined} {...(props as object)}>
        {children}
      </Tag>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: { children?: ReactNode }) {
  return <p>{children}</p>;
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <code>{children}</code>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks — plain carbon block,
  // styled by .dossier-prose pre/code. Language kept as data attr only.
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    const language = String(className).replace("language-", "");

    return (
      <pre data-language={language}>
        <code>{children}</code>
      </pre>
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList(as: "ul" | "ol") {
  const Cmp = ({ children }: { children: ReactNode }) => {
    const Tag = as as "ul";
    return <Tag>{children}</Tag>;
  };
  Cmp.displayName = `Dossier${as === "ul" ? "Ul" : "Ol"}`;
  return Cmp;
}

function createListItem({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

function createHR() {
  return <hr />;
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList("ol") as any,
  ul: createList("ul") as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

/**
 * Stored article/project bodies are authored as HTML-flavoured MDX and
 * sometimes carry plain `class=` / `for=` attributes, which React reports as
 * "Invalid DOM property `class`". Convert those attributes to their JSX
 * equivalents inside real tags only — fenced code samples stay byte-identical
 * so displayed code is never corrupted. (Data files themselves untouched.)
 */
function sanitizeJsxAttrs(source: string): string {
  return source
    .split(/(```[\s\S]*?```)/g)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .replace(/<([a-zA-Z][^<>]*?)\sclass=/g, "<$1 className=")
        .replace(/<([a-zA-Z][^<>]*?)\sfor=/g, "<$1 htmlFor=");
    })
    .join("");
}

export function CustomMDX(props: CustomMDXProps) {
  const { source, ...rest } = props as CustomMDXProps & { source: string };
  const safeSource =
    typeof source === "string" ? sanitizeJsxAttrs(source) : source;
  return (
    <div className="dossier-prose">
      <MDXRemote
        options={{ blockJS: false }}
        {...rest}
        source={safeSource}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
}
