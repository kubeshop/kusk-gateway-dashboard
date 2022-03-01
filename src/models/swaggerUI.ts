interface TableOfContentsItem {
  label: JSX.Element;
  level: 'top' | 'path' | 'operation';
  kuskExtensionRef?: string;
  operationId?: string;
  operationElementId?: string;
  tag?: string;
}

export type {TableOfContentsItem};
