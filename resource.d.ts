import type { Message } from "./message";

/**
 * The data model of a [message resource](https://w3c.github.io/message-resources/).
 *
 * All character escapes are parsed in this representation.
 */
interface Resource {
  /**
   * A comment on the whole resource, which applies to all of its sections and entries.
   *
   * In the syntax, resource comments and metadata are separated from the rest of the resource
   * by a frontmatter separator line `---`.
   */
  comment: string;

  /**
   * Metadata attached to the whole resource.
   *
   * A resource has at least one metadata entry, for `@locale`.
   *
   * In the syntax, resource comments and metadata are separated from the rest of the resource
   * by a frontmatter separator line `---`.
   */
  meta: Metadata[];

  /** The body of a message resource file. */
  sections: Section[];
}

interface Metadata {
  /** A non-empty string keyword. */
  key: string;

  /** The metadata contents, which may be empty. */
  value: string;
}

interface Section {
  /** A comment on the whole section, which applies to all of its entries. */
  comment: string;
  meta: Metadata[];

  /** The section identifier, an array of non-empty `string` values. */
  id: string[];
  entries: (Entry | Comment)[];
}

interface Entry {
  type: "entry";
  comment: string;
  meta: Metadata[];

  /**
   * The entry identifier, a non-empty array of non-empty `string` values.
   *
   * Entry identifiers are not normalized,
   * i.e. they do not include the section identifier as a prefix.
   */
  id: string[];
  value: Message;
}

/** A standalone comment, not relevant for translation. */
interface Comment {
  type: "comment";
  comment: string;
}
