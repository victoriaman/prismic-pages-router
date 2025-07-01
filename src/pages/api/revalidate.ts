import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret;

  if (secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    // Revalidate specific paths based on webhook payload
    await res.revalidate('/about'); // Change path as needed
    console.log('Revalidated /about');
    return res.json({ revalidated: true });
  } catch (err) {
    console.log('Revalidated /about failed:', err);
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
