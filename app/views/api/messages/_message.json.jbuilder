json.extract! message, :id, :body, :channel_id, :author_id, :parent_id

json.timestamp message.created_at.localtime.strftime("%l:%M %p")
