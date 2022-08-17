// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function ver(req, res) {
  const {address} = JSON.parse(req.body)
  return res.status(200).json({isValid: true})
}
