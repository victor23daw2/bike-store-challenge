# with this seeds.rb, I provide a couple of bikes to test the API 
CartItem.delete_all
Cart.delete_all
InvalidCombination.delete_all
ProductOption.delete_all
Option.delete_all
OptionCategory.delete_all
Product.delete_all

frame = OptionCategory.create!(name: "frame")
brakes = OptionCategory.create!(name: "brakes")
wheels = OptionCategory.create!(name: "wheels")
saddle = OptionCategory.create!(name: "saddle")

frame_full = Option.create!(name: "Full suspension", stock: 10, extra_price: 120.00, option_category: frame)
frame_diamond = Option.create!(name: "Diamond", stock: 8, extra_price: 90.00, option_category: frame)

brakes_disc = Option.create!(name: "Disc brakes", stock: 12, extra_price: 60.00, option_category: brakes)
brakes_rim = Option.create!(name: "Rim brakes", stock: 5, extra_price: 30.00, option_category: brakes)

wheels_road = Option.create!(name: "Road wheels", stock: 7, extra_price: 80.00, option_category: wheels)
wheels_mountain = Option.create!(name: "Mountain wheels", stock: 0, extra_price: 100.00, option_category: wheels)

saddle_racing = Option.create!(name: "Racing saddle", stock: 9, extra_price: 35.00, option_category: saddle)
saddle_comfort = Option.create!(name: "Comfort saddle", stock: 6, extra_price: 20.00, option_category: saddle)

bike_1 = Product.create!(
  name: "City Bike",
  category: "bicycle",
  price: 450.00,
  image_url: "https://img.freepik.com/foto-gratis/cerrar-piernas-zapatillas-deporte-manos-volante-hombre-barbudo-estilo-hipster-sudadera-capucha-roja-pantalon-beige-montando-solo-mochila-bicicleta-mochilero-viajero-estilo-vida-activo-saludable_285396-5489.jpg",
  description: "A comfortable and practical bike ideal for commuting and short city rides."
)

bike_2 = Product.create!(
  name: "Trail Bike",
  category: "bicycle",
  price: 600.00,
  image_url: "https://img.freepik.com/foto-gratis/guapo-joven-africano-temprano-manana-bicicleta_171337-12969.jpg",
  description: "Perfect for off-road trails and mountain adventures, with strong suspension."
)

bike_3 = Product.create!(
  name: "Beach Cruiser",
  category: "bicycle",
  price: 520.00,
  image_url: "https://img.freepik.com/foto-gratis/bicicleta-vintage-solo-pie-sobre-arena_1303-24282.jpg",
  description: "Smooth and stylish for relaxing rides along the beach or boardwalk."
)

bike_4 = Product.create!(
  name: "Forest Explorer",
  category: "bicycle",
  price: 690.00,
  image_url: "https://img.freepik.com/foto-gratis/bicicleta-blanca-suelo-bosque_23-2148232046.jpg",
  description: "Designed for forest paths and nature exploration, comfortable and durable."
)

[bike_1, bike_2, bike_3, bike_4].each do |bike|
  ProductOption.create!(product: bike, option: frame_diamond)
  ProductOption.create!(product: bike, option: frame_full)
  ProductOption.create!(product: bike, option: brakes_rim)
  ProductOption.create!(product: bike, option: brakes_disc)
  ProductOption.create!(product: bike, option: wheels_road)
  ProductOption.create!(product: bike, option: wheels_mountain)
  ProductOption.create!(product: bike, option: saddle_comfort)
  ProductOption.create!(product: bike, option: saddle_racing)
end

InvalidCombination.create!(option_1: wheels_mountain, option_2: brakes_rim, reason: "not safe together")

puts "Seed finished"
