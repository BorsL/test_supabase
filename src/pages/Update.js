import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"


const Update = () => {
  const {id}=useParams()
  const navigate = useNavigate()

  const [titolo, setTitle] = useState('')
  const [testo, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if (!titolo || !testo || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const {data, error} = await supabase
      .from('smoothies')
      .update({titolo, testo, rating})
      .eq('id', id)
      .select()

    if(error){
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(()=>{
    const fetchSmoothie = async ()=>{
      const {data, error} = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if(error){
        navigate('/', {replace: true})
      }
      if(data){
        setTitle(data.titolo)
        setMethod(data.testo)
        setRating(data.rating)
        console.log(data)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={titolo}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={testo}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Aggiorna Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update