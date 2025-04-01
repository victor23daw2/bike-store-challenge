class Api::V1::InvalidCombinationsController < ApplicationController
    def index
      combinations = InvalidCombination.all.includes(:option_1, :option_2)
      render json: combinations.map { |c|
        {
          option_1_id: c.option_1_id,
          option_2_id: c.option_2_id
        }
      }
    end
  end