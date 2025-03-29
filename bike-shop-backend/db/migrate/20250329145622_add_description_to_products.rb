class AddDescriptionToProducts < ActiveRecord::Migration[7.2]
  def change
    add_column :products, :description, :text
  end
end
