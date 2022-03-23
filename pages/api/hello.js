import apidata from '../../components/data'

export default function handler(req, res) {
  let id = req.query.id
  if (id == undefined) { id = 0 }
  if (id >= apidata.length) { id = 0 }

  res.json(apidata[id])
}