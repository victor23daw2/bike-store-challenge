class Product < ApplicationRecord
    has_many :product_options
    has_many :options, through: :product_options
end