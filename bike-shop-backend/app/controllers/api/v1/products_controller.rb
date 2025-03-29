module Api
  module V1
    class ProductsController < ApplicationController
      def index
        products = Product.all
        render json: products, status: :ok
      end

      def show
        product = Product.find(params[:id])
      
        options = product.options.includes(:option_category).map do |option|
          {
            id: option.id,
            name: option.name,
            stock: option.stock,
            category: option.option_category.name
          }
        end
      
        render json: {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image_url: product.image_url,
          description: product.description,
          options: options
        }
      end
      
    end
  end
end
