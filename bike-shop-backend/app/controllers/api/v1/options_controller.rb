class Api::V1::OptionsController < ApplicationController
    def index
        options = Option.all.includes(:option_category)
        render json: options.as_json(include: :option_category)
    end
end
  