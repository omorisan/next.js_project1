import apidata from '../../../components/data'

export default function handler(req, res) {
  const {
    query: {id}
  } = req

  res.json(apidata[id])
}