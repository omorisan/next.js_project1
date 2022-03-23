import {useState} from 'react'
import Layout from '../components/layout'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const [pref, setPref] = useState({id:0, item:'name'})
  const [ address, setAddress ] = useState('/api/hello/'
      + pref.id + '/' + pref.item)
  //const { data, err } = useSWR(address)
  const{data}=useSWR(address,fetcher)

  const onChange = (e)=> {
    pref.id = e.target.value
    setPref(pref)
    setAddress('/api/hello/' + pref.id + '/' + pref.item)
  }
  const onSelect = (e)=> {
    pref.item = e.target.value
    setPref(pref)
    setAddress('/api/hello/' + pref.id + '/' + pref.item)
  }

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">
          {JSON.stringify(data) }
        </h5>
        <input type="number" 
            className="form-control form-control-sm mb-2"
          onChange={onChange} />
        <select onChange={onSelect} 
            className="form-control form-control-sm">
          <option value="name">Name</option>
          <option value="mail">Mail</option>
          <option value="age">Age</option>
        </select>
      </div>
      </Layout>
    </div>
  )
}
