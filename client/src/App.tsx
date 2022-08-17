import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Form from './components/Form'

interface Book {
  autor: string
  title: string
  price: string
  _id: string
}

function App() {
  const [books, setBooks] = useState<Book[]>([])

  const subscribe: () => void = useCallback(async () => {
    // в блоке try мы отправляем GET запрос
    try {
      // и когда ответ придет, мы запишем его в переменную data с помощью
      // диструктуризации
      const responce = await axios.get(
        'http://localhost:5000/api/v1/book/subscribe',
        { timeout: 10000 }
      )
      // полученные данные записываем в state
      // здесь обязательно записываем через callback
      if (responce.data !== 'not message') {
        setBooks((prev: Book[]) => [...prev, responce.data])
      }
      // после чего снова возобновляем подписку
      await subscribe()
    } catch (e) {
      // в блок catch мы момпадаем когда по истечении долгого времени мы так
      // ничего не получили и срок запроса истек
      setTimeout(() => {
        //здесь через 0.5 сек возобновляем подписку
        subscribe()
      }, 500)
    }
  }, [])

  useEffect(() => {
    axios
      .get<{ data: Book[] }>('http://localhost:5000/api/v1/book')
      .then((res) => {
        setBooks(res.data.data)
      })
      .then(() => {
        subscribe()
      })
  }, [subscribe])
  return (
    <div className="container">
      <Form />
      {books.map((book: Book) => (
        <div key={book._id} className="book">
          <div className="title">
            <h3>{book.title}</h3>
            <p>{book.autor}</p>
            <span>{book.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
