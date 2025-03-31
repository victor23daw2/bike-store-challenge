class Api::V1::Admin::ProductsController < ApplicationController
    def index
      products = Product.all
      render json: products
    end
  
    def create
      product = Product.new(product_params)
      if product.save
        if params[:option_ids]
          params[:option_ids].each do |option_id|
            ProductOption.create(product_id: product.id, option_id: option_id)
          end
        end
        render json: product, status: :created
      else
        render json: { errors: product.errors.full_messages }, status: :unprocessable_entity

      end
    end
  
    def destroy
      product = Product.find(params[:id])
      product.destroy
      head :no_content
    end
  
    private
  
    def product_params
      params.require(:product).permit(:name, :category, :price, :description, :image_url)
    end
  end
  