# Clean up old seed data
User.destroy_all
Sound.destroy_all
Composition.destroy_all
CompositionSound.destroy_all

puts "Pre-existing data cleared"

# Sounds
Sound.create(name: "Sound 1", description: "Weather: Rain, Thunder, claps and rolls at various distances", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07027060.wav", image_url: "https://i.imgur.com/mVbmFQp.jpg")

Sound.create(name: "Sound 2", description: "Birds: A country idyll, countryside atmosphere", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07074106.wav", image_url: "https://www.rspb.org.uk/globalassets/images/birds-and-wildlife/bird-species-illustrations/redstart_male_1200x675.jpg?preset=largelandscape_desktop")

Sound.create(name: "Sound 3", description: "Small river flowing", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07060074.wav", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_abEBAKtpTJ7VhGw62GkIjYg53qfuOZMeU8S_VRPxGx6L-fHh")

Sound.create(name: "Sound 4", description: "Crickets", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07043332.wav", image_url: "https://scx1.b-cdn.net/csz/news/800/2018/whythesummer.jpg")

Sound.create(name: "Sound 5", description: "Fireplace", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07059050.wav", image_url: "https://images.unsplash.com/photo-1546182208-1e70985e2bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60")

puts "Sample sound snippets created"

# Users
u1 = User.create(name: "testuser1")
u2 = User.create(name: "testuser2")
u3 = User.create(name: "testuser3")

puts "Sample users created"

# Compositions
Composition.create(name: "Composition 1", user_id: User.all.sample.id)
Composition.create(name: "Composition 2", user_id: User.all.sample.id)
Composition.create(name: "Composition 3", user_id: User.all.sample.id)
Composition.create(name: "Composition 4", user_id: User.all.sample.id)
Composition.create(name: "Composition 5", user_id: User.all.sample.id)

puts "Sample compositions created"

# Composition sounds
20.times do |item|
    item = CompositionSound.create(volume: rand, sound_id: Sound.all.sample.id, composition_id: Composition.all.sample.id)
end

puts "Sample composition sounds created"
    

