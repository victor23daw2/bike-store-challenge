Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show]
      get 'options', to: 'options#index'
      post 'options', to: 'options#create'

      get 'option_categories', to: 'option_categories#index'

      namespace :admin do
        resources :products, only: [:index, :create, :destroy] do
          get 'options', on: :member
        end
      end
      
    end
  end
end
