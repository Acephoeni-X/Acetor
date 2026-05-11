// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let revalidate = false;

  try {
    await res.revalidate({ pathname: `/` });
    revalidate = true;
  } catch (err) {
    console.log(err);
  }
  res.json({ revalidate });
}
