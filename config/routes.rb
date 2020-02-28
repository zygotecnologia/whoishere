Rails.application.routes.draw do
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, path: '/api' do
    resources :users
  end

  resources :home, only: %i[index]
  root to: 'home#index'

end
