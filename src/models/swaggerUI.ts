interface TableOfContentsItem {
  label: JSX.Element;
  ref: string;
  operationId?: string;
  level: 'top' | 'path' | 'operation';
  operationElementId?: string;
  tag?: string;
}

export type {TableOfContentsItem};
