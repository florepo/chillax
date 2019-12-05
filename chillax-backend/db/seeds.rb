# Clean up old seed data
User.destroy_all
Sound.destroy_all
Composition.destroy_all
CompositionSound.destroy_all

puts "Pre-existing data cleared"

# Sounds
Sound.create(name: "Sound 1", description: "Weather: Rain, Thunder, claps and rolls at various distances", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07027060.wav", image_url: "https://image.flaticon.com/icons/svg/414/414974.svg")

Sound.create(name: "Sound 2", description: "Birds: A country idyll, countryside atmosphere", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07074106.wav", image_url: "https://image.flaticon.com/icons/svg/141/141762.svg")

Sound.create(name: "Sound 3", description: "Small river flowing", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07060074.wav", image_url: "https://image.flaticon.com/icons/svg/1400/1400342.svg")

Sound.create(name: "Sound 4", description: "Crickets", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07043332.wav", image_url: "https://image.flaticon.com/icons/svg/616/616564.svg")

Sound.create(name: "Sound 5", description: "Fireplace", sound_url: "http://bbcsfx.acropolis.org.uk/assets/07059050.wav", image_url: "https://image.flaticon.com/icons/svg/1365/1365093.svg")

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
    

