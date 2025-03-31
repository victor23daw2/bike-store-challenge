module Api
  module V1
    class ProductsController < ApplicationController
      def index
        products = Product.all
        render json: products, status: :ok
      end

      def show
        product = Product.includes(options: :option_category).find(params[:id])
      
        render json: {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          image_url: product.image_url,
          options: product.options.map do |option|
            {
              id: option.id,
              name: option.name,
              stock: option.stock,
              extra_price: option.extra_price,
              option_category: {
                id: option.option_category&.id,
                name: option.option_category&.name
              }
            }
          end
        }
      end
      
           
      
    end
  end
end
