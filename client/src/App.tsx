import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface Book {
  autor: string
  title: string
  price: string
  _id: string
}

function App() {
  const [book, setBook] = useState<null | Book>(null)

  const subscribe: (id: string) => void = useCallback(async (id: string) => {
    // в блоке try мы отправляем GET запрос
    try {
      // и когда ответ придет, мы запишем его в переменную data с помощью
      // диструктуризации
      const { data } = await axios.get<{ data: Book }>(
        `http://localhost:5000/api/v1/book/${id}`
      )
      // полученные данные записываем в state
      // здесь обязательно записываем через callback
      setBook(data.data)
      // после чего снова возобновляем подписку
      await subscribe(id)
    } catch (e) {
      // в блок catch мы момпадаем когда по истечении долгого времени мы так
      // ничего не получили и срок запроса истек
      setTimeout(() => {
        //здесь через 0.5 сек возобновляем подписку
        subscribe(id)
      }, 500)
    }
  }, [])

  useEffect(() => {
    axios
      .get<{ data: Book[] }>('http://localhost:5000/api/v1/book')
      .then((res) => {
        setBook(res.data.data[0])
        return res.data.data[0]._id
      })
      .then((id) => {
        subscribe(id)
      })
  }, [subscribe])
  return <div className="app">{book ? <div></div> : <div></div>}</div>
}

export default App
