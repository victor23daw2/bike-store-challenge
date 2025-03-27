class InvalidCombination < ApplicationRecord
    belongs_to :option_1, class_name: "Option"
    belongs_to :option_2, class_name: "Option"
end
  