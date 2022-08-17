import axios from 'axios'
import { FC, useState } from 'react'

interface Input {
  id: number
  type: string
  name: 'title' | 'autor' | 'price'
  title: string
}

interface Data {
  title: string
  autor: string
  price: string
}

const inputs: Input[] = [
  { id: 1, type: 'text', name: 'title', title: 'Заголовок' },
  { id: 2, type: 'text', name: 'autor', title: 'Автор' },
  { id: 3, type: 'text', name: 'price', title: 'Цена' },
]

const Form: FC = () => {
  const [data, setData] = useState<Data>({
    title: '',
    autor: '',
    price: '',
  })

  const submitHandler = async () => {
    axios
      .post('http://localhost:5000/api/v1/book', {
        ...data,
      })
      .then((res) => {
        console.log(res.data)
      })
  }
  return (
    <div className="form">
      {inputs.map((item: Input) => (
        <div key={item.id} className="form__item">
          <input
            type="text"
            value={data[item.name]}
            placeholder={item.title}
            onChange={(e) => {
              setData({ ...data, [item.name]: e.target.value })
            }}
          />
        </div>
      ))}

      <button onClick={submitHandler}>Отправить</button>
    </div>
  )
}

export default Form
