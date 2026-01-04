// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let revalidate = false;
  const { query } = req.query;
  try {
    await res.revalidate(`/${query}`);
    revalidate = true;
  } catch (err) {
    console.log(err);
  }
  res.json({ revalidate });
}
