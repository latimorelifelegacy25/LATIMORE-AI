import type { MDXComponents } from 'mdx/types';
import ComparisonTable from './components/ComparisonTable';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ComparisonTable,
    ...components,
  };
}
