json.set! "users" do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end