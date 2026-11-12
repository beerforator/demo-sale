import catalog from './products.json'

const photos = import.meta.glob('../assets/food/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export default catalog.map(product => ({
  ...product,
  image: photos[`../assets/food/${product.id}.webp`] ?? null,
}))
