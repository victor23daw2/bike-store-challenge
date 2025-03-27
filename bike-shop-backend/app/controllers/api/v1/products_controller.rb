module Api
  module V1
    class ProductsController < ApplicationController
      def index
        products = Product.all
        render json: products, status: :ok
      end
    end
  end
end
