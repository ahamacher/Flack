# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: "test@user.com", password: "password"})
Channel.create({name: 'general', is_dm: false, default: true, author_id: 2})
Channel.create({name: 'random', is_dm: false, default: true, author_id: 2})
ChannelJoin.create({user_id: 2, channel_id: 1})
ChannelJoin.create({user_id: 2, channel_id: 2})