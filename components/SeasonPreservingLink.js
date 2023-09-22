import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SeasonPreservingLink({ to, children }) {
  const { query } = useRouter();

  // If 'to' is not provided, don't render anything.
  if (!to) return null;

  let href = { pathname: to, query: {} };
  if (query.season) {
    href.query.season = query.season;
  }

  return <Link href={href}>{children}</Link>;
}
