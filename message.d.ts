/**
 * This data model is extracted from the [Interchange Data Model][UTS35]
 * section of Unicode Locale Data Markup Language (LDML) Part 9: MessageFormat,
 * where it is presented as an optional data model representation of Unicode MessageFormat messages.
 *
 * Its representation here is intended to be informative, but not normative.
 *
 * [UTS35]: https://www.unicode.org/reports/tr35/tr35-78/tr35-messageFormat.html#interchange-data-model

 */
type Message = PatternMessage | SelectMessage;

interface PatternMessage {
  type: "message";
  declarations: Declaration[];
  pattern: Pattern;
}

interface SelectMessage {
  type: "select";
  declarations: Declaration[];
  selectors: VariableRef[];
  variants: Variant[];
}

type Declaration = InputDeclaration | LocalDeclaration;

interface InputDeclaration {
  type: "input";
  name: string;
  value: VariableExpression;
}

interface LocalDeclaration {
  type: "local";
  name: string;
  value: Expression;
}

interface Variant {
  keys: Array<Literal | CatchallKey>;
  value: Pattern;
}

interface CatchallKey {
  type: "*";
  value?: string;
}

type Pattern = Array<string | Expression | Markup>;

type Expression = LiteralExpression | VariableExpression | FunctionExpression;

interface LiteralExpression {
  type: "expression";
  arg: Literal;
  function?: FunctionRef;
  attributes: Attributes;
}

interface VariableExpression {
  type: "expression";
  arg: VariableRef;
  function?: FunctionRef;
  attributes: Attributes;
}

interface FunctionExpression {
  type: "expression";
  arg?: never;
  function: FunctionRef;
  attributes: Attributes;
}

interface Literal {
  type: "literal";
  value: string;
}

interface VariableRef {
  type: "variable";
  name: string;
}

interface FunctionRef {
  type: "function";
  name: string;
  options: Options;
}

type Options = Map<string, Literal | VariableRef>;

interface Markup {
  type: "markup";
  kind: "open" | "standalone" | "close";
  name: string;
  options: Options;
  attributes: Attributes;
}

type Attributes = Map<string, Literal | true>;
