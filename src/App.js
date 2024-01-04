import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item])

  }

  function handleDeleteItem(id) {

    setItems(
      (items) => items.filter(
        item => item.id !== id
      )
    )

  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItems={handleToggleItem} />
      < Stats />
    </div>
  );
}

function Logo() {
  return (
    <h1> 🌴 Far Away 👜</h1>
  )
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");

  const [select, setSelect] = useState(1);






  function handleSubmit(e) {

    if (!description) {
      return;
    }

    const newItem = {
      description, select, packed: false, id: Date.now()
    }


    onAddItems(newItem)
    console.log(newItem)

    setDescription("")
    setSelect(1)

    e.preventDefault()
  }

  return (

    <form className="add-form" onSubmit={handleSubmit}>

      <h3>What do you need for your 😍 trip</h3>

      <select value={select} onChange={(e) => {
        setSelect(Number(e.target.value));
      }}>

        {/* <option value={1}>1</option>
        <option value={2}>2</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (

          <option value={num} key={num}>{num}</option>

        ))}

      </select>

      <input type="text" placeholder="Item..." value={description} onChange={(e) => { setDescription(e.target.value) }} />

      <button>Add</button>

    </form>

  )
}

function PackingList({ items, onDeleteItem, onToggleItems }) {

  return (
    <div className="list">
      <ul>
        {items.map(
          (item) => <Item item={item} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems} key={item.id} />
        )}
      </ul>
    </div>
  )

}

function Item({ item, onDeleteItem, onToggleItems }) {

  return (
    <li>

      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)} />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.select} {item.description}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>

    </li>
  )

}

function Stats() {
  return (
    <footer className="stats">
      <em>
        👜 You have X items on your list, and you already packed  X
      </em>
    </footer>
  )
}