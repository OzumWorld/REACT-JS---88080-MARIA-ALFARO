export default function ItemListContainer({ greeting }){
    return (
      <section className="wrapper">
        <article className="card">
          <h2>Tienda</h2>
          <p>{greeting}</p>
        </article>
      </section>
    )
  }
  