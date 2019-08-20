# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: "test@user.com", password: "password"})
User.create({email: "andrew@user.com", password: "password"})
User.create({email: "may@user.com", password: "password"})
User.create({email: "rich@user.com", password: "password"})
User.create({email: "demo@user.com", password: "password"})

Channel.create({name: 'general', is_dm: false, default: true, author_id: 1})
Channel.create({name: 'random', is_dm: false, default: true, author_id: 1})
ChannelJoin.create({user_id: 1, channel_id: 1})
ChannelJoin.create({user_id: 1, channel_id: 2})

Message.create({body: "Hey this is the general channel", author_id: 2, channel_id: 1})
Message.create({body: "Woah cool, this chat works in real-time!", author_id: 3, channel_id: 1})
Message.create({body: "How is your day going?", author_id: 3, channel_id: 1})
Message.create({body: "Pretty well, I am just working on my Flack project", author_id: 2, channel_id: 1})
Message.create({body: "It's pretty neat! I built it using a Ruby on Rails backend and a React.js / Redux frontend", author_id: 2, channel_id: 1})
Message.create({body: "I really like the way React works, so much fun to make apps with", author_id: 2, channel_id: 1})
Message.create({body: "Nice! I'm not sure what that means but sounds cool", author_id: 3, channel_id: 1})

