class Api::V1::OptionsController < ApplicationController
    def index
      options = Option.includes(:option_category).all
      render json: options.as_json(include: :option_category)
    end

    def create
      option = Option.new(option_params)
      if option.save
        render json: option, status: :created
      else
        render json: { errors: option.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private
    
    def option_params
      params.require(:option).permit(:name, :stock, :extra_price, :option_category_id)
    end
    
end
  