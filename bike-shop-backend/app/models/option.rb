class Option < ApplicationRecord
  belongs_to :option_category
  has_many :product_options
  has_many :products, through: :product_options

  def category
    option_category&.name
  end
  
end