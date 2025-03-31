module Api
    module V1
      class OptionCategoriesController < ApplicationController
        def index
          categories = OptionCategory.all
          render json: categories
        end
      end
    end
  end
  