import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus } from '../components/Icons.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useReveal } from '../hooks/useReveal.js'
import coverPhoto from '../assets/food/cover.webp'
import chefPhoto from '../assets/food/chef.webp'
import categories from '../data/categories.json'
import products from '../data/products.js'

const menu = new Map(products.map(product => [product.id, product]))
const chefPicks = ['philadelphia', 'eel-roll', 'spicy-tuna'].map(id => menu.get(id))
const sets = [
  { id: 'set-duo', occasion: 'На двоих' },
  { id: 'set-company', occasion: 'Для компании' },
  { id: 'set-family', occasion: 'На всю семью' },
  { id: 'set-party', occasion: 'Для вечеринки' },
]
const newFlavors = ['alaska-hot', 'baked-shrimp'].map(id => menu.get(id))
const filterLabels = { new: 'Новинки', hit: 'Хиты', spicy: 'Острые', veg: 'Вегетарианские' }
const priceFormatter = new Intl.NumberFormat('ru-RU')

function Price({ value }) {
  return <span className="editorial-price">{priceFormatter.format(value)} ₽</span>
}

function AddProduct({ product }) {
  const { addItem, items } = useCart()
  const quantity = items.find(item => item.productId === product.id)?.quantity ?? 0

  if (product.stopList) return <span className="editorial-unavailable">Нет в наличии</span>

  return (
    <button
      className="editorial-add"
      type="button"
      onClick={() => addItem(product)}
      aria-label={`Добавить в корзину: ${product.name}`}
      disabled={quantity >= 99}
    >
      {quantity > 0 && <span aria-hidden="true">{quantity}</span>}
      <Plus size={16} />
    </button>
  )
}

function Cover() {
  const coverRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    const cover = coverRef.current
    const photo = photoRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null

    function updateMotion() {
      frame = null
      const scroll = reduceMotion.matches ? 0 : Math.max(window.scrollY, 0)
      const distance = Math.min(photo.clientHeight, 480)
      const rotationProgress = Math.min(scroll / Math.max(distance, 1), 1)
      const backdropProgress = Math.min(scroll / Math.max(cover.clientHeight, 1), 1)
      cover.style.setProperty('--cover-rotation', `${-34 * rotationProgress}deg`)
      cover.style.setProperty('--cover-drift', `${120 * backdropProgress}px`)
    }

    function scheduleUpdate() {
      if (frame === null) frame = requestAnimationFrame(updateMotion)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reduceMotion.addEventListener('change', scheduleUpdate)
    updateMotion()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reduceMotion.removeEventListener('change', scheduleUpdate)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="editorial-cover" ref={coverRef} aria-labelledby="cover-title">
      <div className="editorial-cover-backdrop" aria-hidden="true" />
      <div className="editorial-container editorial-cover-inner">
        <div className="editorial-cover-intro">
          <p className="editorial-label">Доставка по Новороссийску</p>
          <h1 id="cover-title">Роллы<br /><em>с характером</em></h1>
        </div>
        <div className="editorial-cover-photo" ref={photoRef}>
          <img
            src={coverPhoto}
            alt="Ролл с лососем в палочках"
            width={950}
            height={860}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="editorial-cover-details">
          <p className="editorial-cover-description">Лосось, хрустящая темпура и сеты на общий стол.</p>
          <div className="editorial-cover-actions">
            <Link className="editorial-cta" to="/#catalog">Открыть меню <span aria-hidden="true">→</span></Link>
            <Link className="editorial-cover-secondary" to="/#chef">Выбор шефа</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function DishPhoto({ src, alt = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="editorial-photo">
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

function MenuCard({ product, occasion }) {
  return (
    <article className={product.image ? 'editorial-card' : 'editorial-card editorial-card--text'}>
      {product.image && <DishPhoto src={product.image} />}
      {occasion && <p className="editorial-label">{occasion}</p>}
      <h3>{product.name}</h3>
      <p className="editorial-description">{product.description}</p>
      <div className="editorial-card-bottom">
        <div>
          <Price value={product.price} />
          <span className="editorial-weight">{product.weight}{product.pieces > 1 && ` · ${product.pieces} шт.`}</span>
        </div>
        <AddProduct product={product} />
      </div>
    </article>
  )
}

function MenuLine({ product }) {
  return (
    <li className="editorial-menu-line">
      <div>
        <h3>{product.name}</h3>
        <p className="editorial-description">{product.description}</p>
      </div>
      <div className="editorial-menu-line-action">
        <Price value={product.price} />
        <AddProduct product={product} />
      </div>
    </li>
  )
}

function SetCollection() {
  const track = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(true)

  useEffect(() => {
    const rail = track.current
    const update = () => {
      setCanGoBack(rail.scrollLeft > 1)
      setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1)
    }
    const observer = new ResizeObserver(update)
    observer.observe(rail)
    rail.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      rail.removeEventListener('scroll', update)
    }
  }, [])

  function shift(direction) {
    const rail = track.current
    const [first, second] = rail.children
    rail.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft) })
  }

  return (
    <section className="editorial-section" id="sets" aria-labelledby="sets-title" data-scroll-reveal>
      <div className="editorial-section-heading">
        <h2 id="sets-title">Сеты к столу</h2>
        <div className="editorial-rail-controls">
          <button type="button" disabled={!canGoBack} onClick={() => shift(-1)} aria-label="Предыдущие сеты"><ChevronLeft size={19} /></button>
          <button type="button" disabled={!canGoForward} onClick={() => shift(1)} aria-label="Следующие сеты"><ChevronRight size={19} /></button>
        </div>
      </div>
      <div className="editorial-set-rail" ref={track}>
        {sets.map(({ id, occasion }) => <MenuCard key={id} product={menu.get(id)} occasion={occasion} />)}
      </div>
    </section>
  )
}

function Catalog() {
  const [category, setCategory] = useState(categories[0])
  const [subcategory, setSubcategory] = useState('all')
  const [filter, setFilter] = useState('all')
  const categoryProducts = products.filter(product => product.categoryId === category.id)
  const subgroup = categoryProducts.filter(product => subcategory === 'all' || product.subcategoryId === subcategory)
  const availableFilters = category.filters.filter(tag => tag !== 'all' && subgroup.some(product => product.tags.includes(tag)))
  const visible = subgroup.filter(product => filter === 'all' || product.tags.includes(filter))

  return (
    <section className="editorial-section editorial-catalog" id="catalog" aria-labelledby="catalog-title" data-scroll-reveal>
      <div className="editorial-section-heading">
        <h2 id="catalog-title">Всё меню</h2>
        <span className="editorial-catalog-count" role="status">Позиций: {visible.length}</span>
      </div>
      <div className="editorial-categories" role="group" aria-label="Категории меню">
        {categories.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category.id === item.id}
            onClick={() => { setCategory(item); setSubcategory('all'); setFilter('all') }}
          >{item.name}</button>
        ))}
      </div>
      <div className="editorial-catalog-filters">
        <label className="editorial-select">
          <span>Вид</span>
          <select value={subcategory} onChange={event => { setSubcategory(event.target.value); setFilter('all') }}>
            {category.subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
          </select>
        </label>
        {availableFilters.length > 0 && (
          <label className="editorial-select">
            <span>Подборка</span>
            <select value={filter} onChange={event => setFilter(event.target.value)}>
              <option value="all">Все</option>
              {availableFilters.map(tag => <option key={tag} value={tag}>{filterLabels[tag]}</option>)}
            </select>
          </label>
        )}
      </div>
      <div className="editorial-catalog-grid">
        {visible.map(product => <MenuCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

export default function HomePage() {
  const sectionsRef = useRef(null)
  useReveal(sectionsRef)

  return (
    <main className="editorial-home">
      <Cover />

      <div className="editorial-container" ref={sectionsRef}>
        <section className="editorial-section editorial-chef" id="chef" aria-labelledby="chef-title" data-scroll-reveal>
          <DishPhoto src={chefPhoto} alt="Роллы и суши на керамической тарелке" />
          <div className="editorial-chef-copy">
            <h2 id="chef-title">Выбор шефа</h2>
            <ul>{chefPicks.map(product => <MenuLine key={product.id} product={product} />)}</ul>
          </div>
        </section>

        <SetCollection />

        <section className="editorial-section editorial-new" aria-labelledby="new-title" data-scroll-reveal>
          <div className="editorial-new-copy">
            <h2 id="new-title">Новые<br /> сочетания</h2>
            <p>Ролл в хрустящей темпуре и запечённый с креветкой.</p>
          </div>
          {newFlavors.map(product => <MenuCard key={product.id} product={product} />)}
        </section>

        <Catalog />
      </div>
    </main>
  )
}
