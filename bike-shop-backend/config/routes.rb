Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show]
      get 'options', to: 'options#index'
    end
  end
  
end
