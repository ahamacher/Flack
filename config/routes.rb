Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

    namespace :api, defaults: {format: :json} do
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]
      ## going to nest show later but want to get something working first
      resources :messages, only: [:index, :show, :create, :update, :destroy]
      mount ActionCable.server, at: '/cable'
    end
end
