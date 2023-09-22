// import { useRouter } from 'next/router'
// import Link from 'next/link'

// export default function SeasonPreservingLink({ to, as, children }) {
//   const { query } = useRouter()

//   // If 'to' is not provided, don't render anything
//   if (!to) return null
  
//   let href = to
//   let asPath = as || to // 'as' prop is optional. If not provided, use 'to'

//   if (query.season) {
//     // Append season to 'href' if it contains dynamic segment,
//     // otherwise, append it to 'asPath'.
//     if (to.includes('[') && to.includes(']')) {
//       href = `${to}&season=${query.season}`
//     } else {
//       asPath = `${asPath}?season=${query.season}`
//     }
//   }

//   return <Link href={href} as={asPath}>{children}</Link>
// }










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
