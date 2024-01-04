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

  function handleDeleteAllItems() {
    const confirmed = window.confirm("Are you sure ! you want to delete all items?")

    if (confirmed)
      setItems(
        (items) => items.splice(0, items.length)
      )

  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItems={handleToggleItem} onDeleteAllItems={handleDeleteAllItems} />
      < Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItems, onDeleteAllItems }) {

  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  if (sortBy === "input")
    sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "status")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));


  return (
    <div className="list">
      <ul>
        {sortedItems.map(
          (item) => <Item item={item} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems} key={item.id} />
        )}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="status">Sort by status</option>
        </select>
      </div>
      <button onClick={onDeleteAllItems}>Clear List</button>
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const presItem = Math.round(numPacked / numItems * 100);
  return (
    <footer className="stats">
      <em>
        {presItem === 100 ? "You got everything! Ready to go ✈️" : `👜 You have ${numItems} items on your list, and you already packed  ${numPacked} (${presItem}%)`}

      </em>
    </footer>
  )
}